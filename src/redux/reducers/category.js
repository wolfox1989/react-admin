import {
  GET_Category_SUCCESS,
  ADD_Category_SUCCESS,
  UPDATE_Category_SUCCESS,
  REMOVE_Category_SUCCESS
} from "../action-types/category"

function category(prevState = [], action) {
  switch (action.type) {
    case GET_Category_SUCCESS:
      return action.data;
    case ADD_Category_SUCCESS:
      return [...prevState, action.data];
    case UPDATE_Category_SUCCESS:
      return prevState.map(item => {
        if (item._id === action.data._id) return action.data;
        return item;
      });
    case REMOVE_Category_SUCCESS:
      return prevState.filter(item => {
        if (item._id !== action.data) return item;
      });
    default:
      return prevState;
  }
}

export default category;