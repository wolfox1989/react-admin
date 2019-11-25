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
//请求Category
export const reqCategory= ()=>axiosInstance({
  method: "GET",
  url: "/category/get",
});
//addCategory
export const reqAddCategory= (categoryName)=>axiosInstance({
  method: "POST",
  url: "/category/add",
  data:{
    categoryName
  }
});
//updateCategory
export const reqUpdateCategory= (categoryId,categoryName)=>axiosInstance({
  method: "POST",
  url: "/category/update",
  data:{
    categoryId,
    categoryName
  }
});
//removeCategory
export const reqRemoveCategory= (categoryId)=>axiosInstance({
  method: "POST",
  url: "/category/delete",
  data:{
    categoryId
  }
});

