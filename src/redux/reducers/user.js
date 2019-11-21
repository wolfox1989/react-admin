import {getItem} from "../../utils/localStorage"
import {GET_USER_SUCCESS} from "../action-types/user"
//localStorage有，作为初始值，没有初始为{}
function user(prevState=getItem("user")||{},action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.data;
    default:
      return prevState;
  }
}
export default user;