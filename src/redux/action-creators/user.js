import {reqLogin} from "../../api/index"
import {GET_USER_SUCCESS} from "../action-types/user"
//同步 返回action的函数
const getUserSuccess = data => ({
  type: GET_USER_SUCCESS,
  data
});
//异步
export const getUserSuccessAsync = (username, password) => dispatch => reqLogin(username, password).then((response) => {
  dispatch(getUserSuccess(response));
  return response//返回response，使得上面返回的promise值是response，方便继续then
});

