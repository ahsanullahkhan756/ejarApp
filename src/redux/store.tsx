import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import appReducer from "./slice/appData";

export const store = configureStore({
  reducer: {
    user: userReducer,
    appData: appReducer
  },
});
