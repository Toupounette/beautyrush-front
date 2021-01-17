import { combineReducers } from "redux";
import createAccount from "./createAccount";
import connectAccount from "./connectAccount";


export default combineReducers({ createAccount, connectAccount });