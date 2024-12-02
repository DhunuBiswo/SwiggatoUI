import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import ReduxIndex from "./ReduxIndex";
const loggerMiddleware = () => {
  return [logger];
};

export const store = configureStore({
  reducer: ReduxIndex,
  middleware: loggerMiddleware,
});
