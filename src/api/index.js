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
//addRole
export const addRole = (name) => axiosInstance({
  method: "POST",
  url: "/role/add",
  data: {
    name
  }
});
//getRole
export const getRole = () => axiosInstance({
  method: "GET",
  url: "/role/get",
});
//updateRole
export const updateRole = (roleId,authName,menus) => axiosInstance({
  method: "POST",
  url: "/role/update",
  data: {
    roleId,authName,menus
  }
});
//deleteRole
export const deleteRole = (roleId) => axiosInstance({
  method: "POST",
  url: "/role/delete",
  data: {
    roleId
  }
});
//getUsers
export const getUsers = () => axiosInstance({
  method: "GET",
  url: "/user/get",
});
//addUser
export const addUser = ({username,password,phone,email,roleId}) => axiosInstance({
  method: "POST",
  url: "/user/add",
  data:{username,password,phone,email,roleId}
});
//updateUser
export const updateUser = (username,password) => axiosInstance({
  method: "POST",
  url: "/user/update",
  data:{username,password}
});
//deleteUser
export const deleteUser = (username) => axiosInstance({
  method: "POST",
  url: "/user/delete",
  data:{username}
});

