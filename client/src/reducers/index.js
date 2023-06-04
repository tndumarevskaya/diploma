import { combineReducers } from "redux";
import auth from "./auth";
import shelter from "./shelter";
import chat from "./chat";
import animal from "./animal";
import volunteer from "./animal";
import adopter from "./animal";
import message from "./message";


export default combineReducers({
  auth,
  shelter,
  chat,
  message,
  animal,
  adopter,
  volunteer
});