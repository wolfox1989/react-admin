import {reqCategory, reqAddCategory, reqUpdateCategory, reqRemoveCategory} from "../../api/index"
import {
  GET_Category_SUCCESS,
  ADD_Category_SUCCESS,
  UPDATE_Category_SUCCESS,
  REMOVE_Category_SUCCESS
} from "../action-types/category"
//get
const getCategory = data => ({
  type: GET_Category_SUCCESS,
  data
});
export const getCategorySuccessAsync = () => dispatch => reqCategory().then(response => dispatch(getCategory(response)));
//add
const addCategory = data => ({
  type: ADD_Category_SUCCESS,
  data
});
export const addCategorySuccessAsync = (categoryName) => dispatch => reqAddCategory(categoryName).then(response => {
  dispatch(addCategory(response));
  return response
});
//update
const updateCategory = data => ({
  type: UPDATE_Category_SUCCESS,
  data
});

export const updateCategorySuccessAsync = (categoryId, categoryName) => dispatch => reqUpdateCategory(categoryId, categoryName).then(response => {
  dispatch(updateCategory(response));
  return response
});
//remove
const removeCategory = data =>({
  type: REMOVE_Category_SUCCESS,
  data
});
export const removeCategorySuccessAsync = categoryId => dispatch => reqRemoveCategory(categoryId).then(response => {
  dispatch(removeCategory(response));
  return response
});

