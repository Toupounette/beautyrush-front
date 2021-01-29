import { combineReducers } from "redux";
import createAccount from "./createAccount";
import connectAccount from "./connectAccount";
//import searchByName from "./search";
import search from "./search";


export default combineReducers({ createAccount, connectAccount, search });