import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import reducers from "./reducers"

let store = process.env.NODE_ENV === "development" ? createStore(reducers, composeWithDevTools(applyMiddleware(thunk))) : createStore(reducers, applyMiddleware(thunk));

export default store;