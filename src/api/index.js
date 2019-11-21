/*
  定义所有请求模块
*/
import axiosInstance from "./request"
//请求登录
 export const reqLogin= (username,password)=>axiosInstance({
    method: "POST",
    url: "/login",
    data: {
      username,
      password
    }
  });

