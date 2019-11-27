/*
  定义所有请求模块
*/
import axiosInstance from "./request"
//login
export const reqLogin = (username, password) => axiosInstance({
  method: "POST",
  url: "/login",
  data: {
    username,
    password
  }
});
//getCategory
export const reqCategory = () => axiosInstance({
  method: "GET",
  url: "/category/get",
});
//addCategory
export const reqAddCategory = (categoryName) => axiosInstance({
  method: "POST",
  url: "/category/add",
  data: {
    categoryName
  }
});
//updateCategory
export const reqUpdateCategory = (categoryId, categoryName) => axiosInstance({
  method: "POST",
  url: "/category/update",
  data: {
    categoryId,
    categoryName
  }
});
//removeCategory
export const reqRemoveCategory = (categoryId) => axiosInstance({
  method: "POST",
  url: "/category/delete",
  data: {
    categoryId
  }
});
//getProductList
export const getProductList = (pageNum, pageSize) => axiosInstance({
  method: "GET",
  url: "/product/list",
  params: {
    pageNum,
    pageSize
  }
});
//addProduct
export const addProduct = ({categoryId, name, price, desc, detail}) => axiosInstance({
  method: "POST",
  url: "/product/add",
  data: {
    categoryId,
    name,
    price,
    desc,
    detail
  }
});
//updateProduct
export const updateProduct = ({productId,categoryId, name, price, desc, detail}) => axiosInstance({
  method: "POST",
  url: "/product/update",
  data: {
    productId,
    categoryId,
    name,
    price,
    desc,
    detail
  }
});
//getProduct
export const getProduct = (productId) => axiosInstance({
  method: "GET",
  url: "/product/get",
  params: {
    productId
  }
});
//delProduct
export const delProduct = (productId) => axiosInstance({
  method: "POST",
  url: "/product/delete",
  data: {
    productId
  }
});
//updateProductStatus
export const updateProductStatus = (productId,status) => axiosInstance({
  method: "POST",
  url: "/product/update/status",
  data: {
    productId,
    status
  }
});
//searchProduct
export const searchProduct = ({searchType, searchValue,pageSize,pageNum}) => axiosInstance({
  method: "GET",
  url: "/product/search",
  params: {
    pageSize,
    pageNum,
    [searchType]:searchValue
  }
});

