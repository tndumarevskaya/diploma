import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import shelter from "./shelter";

export default combineReducers({
  auth,
  message,
  shelter
});