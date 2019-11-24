import {reqCategory} from "../../api/index"
import {GET_Category_SUCCESS, REMOVE_Category_SUCCESS} from "../action-types/category"
//同步 返回action的函数
const getCategory = data => ({
  type: GET_Category_SUCCESS,
  data
});
/*export const removeCategorySuccess = () => ({
  type: REMOVE_Category_SUCCESS,
});*/
//异步
export const getCategorySuccessAsync = () => dispatch => reqCategory().then((response) => dispatch(getCategory(response)));

