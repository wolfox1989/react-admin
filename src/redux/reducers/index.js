import {combineReducers} from "redux";
import user from "./user.js"
import category from "./category.js"
import role from "./role.js"


export default combineReducers({user,category,role});