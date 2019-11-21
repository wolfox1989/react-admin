/*
封装localStorage：
  存储转换成json，取出转换成原数据类型
*/
//localStorage.setItem
export const setItem = (key, value) => {
  try {
    value=JSON.stringify(value)
  } finally {
    window.localStorage.setItem(key,value)
  }
};
//localStorage.getItem
export const getItem = (key) => {
  let value=window.localStorage.getItem(key);
  try{
    return JSON.parse(value);
  }catch {
    return value;
  }
};
////localStorage.removeItem
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};