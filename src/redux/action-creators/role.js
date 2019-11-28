import {getRole, addRole, updateRole, deleteRole} from "../../api"
import {GET_ROLE_SUCCESS, ADD_ROLE_SUCCESS, UPDATE_ROLE_SUCCESS, DELETE_ROLE_SUCCESS} from "../action-types/role"
//get
const getRoleSuccess = data => ({
  type: GET_ROLE_SUCCESS,
  data
});
export const getRoleAsync = () => dispatch => getRole().then(response => dispatch(getRoleSuccess(response)));
//add
const addRoleSuccess = data => ({
  type: ADD_ROLE_SUCCESS,
  data
});
export const addRoleAsync = (name) => dispatch => addRole(name).then(response => dispatch(addRoleSuccess(response)));
//update
const updateRoleSuccess = data => ({
  type: UPDATE_ROLE_SUCCESS,
  data
});
export const updateRoleAsync = (roleId, authName, menus) => dispatch => updateRole(roleId, authName, menus).then(response => dispatch(updateRoleSuccess(response)));
//delete
const deleteRoleSuccess = data => ({
  type: DELETE_ROLE_SUCCESS,
  data
});
export const deleteRoleAsync = roleId => dispatch => deleteRole(roleId).then(response => {
  dispatch(deleteRoleSuccess(roleId));
  return response;
});