/*
封装axios(拦截器axiosInstance)
*/
import axios from "axios"
import {message} from 'antd';
import codeMessage from "../config/code-message.js"
import store from "../redux/store";
import history from "../utils/history";
import {removeItem} from "../utils/localStorage";
import {removeUserSuccess} from "../redux/action-creators/user"
const cancelTokenMap = new Map();
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {}
});
// 一旦地址发生变化，就要取消上一个地址的所有请求。（当当前地址和之前保存的地址不一样时）
history.listen(pathname =>cancelTokenMap.forEach((key, value) => {
    if (value.pathname !== pathname) {
      value.cancel('cancel request');
      cancelTokenMap.delete(key);//map.delete(key)：移除任何与键相关联的值，并且返回该值
    }
  })
);
//请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // cancel是一个函数，一旦调用就能取消ajax请求
    config.cancelToken = new axios.CancelToken(cancel=> {
      cancelTokenMap.set(Symbol(Date.now()), {//map.set(key,val):设置Map对象中键的值,返回该Map对象
        pathname: history.pathname,
        cancel
      })
    });
    let {user:{token}} = store.getState();
    if (token) config.headers.authorization = "Bearer " + token;
    return config
  }
);
//响应拦截器 判断token的有效性
axiosInstance.interceptors.response.use(
  response => {
    if (response.data.status === 0) {
      return response.data.data
    } else {
      message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    let errorMessage = "";
    if (error.response) {
      errorMessage = codeMessage[error.response.status] || '未知错误';
      if(error.response.status===401){//非法token
        history.replace("/login");
        removeItem("user");
        store.dispatch(removeUserSuccess())
      }
    } else {
      if (error.message.indexOf('Network Error') !== -1) {
        errorMessage = '请检查网络连接';
      } else if (error.message.indexOf('timeout') !== -1) {
        errorMessage = '网络太卡了，请连上wifi重试';
      } else {
        errorMessage = '未知错误';
      }
    }
    message.error(errorMessage);
    return Promise.reject(errorMessage);
  }
);
export default axiosInstance;