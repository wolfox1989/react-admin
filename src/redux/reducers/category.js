import {GET_Category_SUCCESS,REMOVE_Category_SUCCESS} from "../action-types/category"

function category(prevState = [], action) {
  switch (action.type) {
    case GET_Category_SUCCESS:
      return action.data;
    default:
      return prevState;
  }
}

export default category;