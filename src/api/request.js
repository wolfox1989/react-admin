/*
封装axios(拦截器axiosInstance)
*/
import axios from "axios"
import {message} from 'antd';
import codeMessage from "../config/code-message.js"
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {}
});
//请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
   console.log(store.getState());
    let {user:{token}} = store.getState();
    console.log(token);
    if (token) config.headers.authorization = "Bearer " + token;
    return config
  }
);
//响应拦截器
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