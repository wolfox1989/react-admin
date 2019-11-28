import {GET_ROLE_SUCCESS,ADD_ROLE_SUCCESS,UPDATE_ROLE_SUCCESS,DELETE_ROLE_SUCCESS} from "../action-types/role"


function role(prevState = [], action) {
  switch (action.type) {
    case GET_ROLE_SUCCESS:
      return action.data;
    case ADD_ROLE_SUCCESS:
      return [...prevState,action.data];
    case DELETE_ROLE_SUCCESS:
      return prevState.filter(item=>item._id!==action.data);
    case UPDATE_ROLE_SUCCESS:
      return prevState.map(item=>{
        if(item._id===action.data._id) return action.data;
        return item
      });
    default:
      return prevState;
  }
}

export default role;