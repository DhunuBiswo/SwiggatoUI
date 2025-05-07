import formReducer from "./Reducers/FormReducers";
import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./Reducers/LoginReducer";
import ResturantReducer from "./Reducers/ResturantReducer";
export default combineReducers({
  formReducer,
  LoginReducer,
  ResturantReducer,
});
