import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import appReducer from "./slice/appData";
import appSettingReducer from "./slice/appSettings";

export const store = configureStore({
  reducer: {
    user: userReducer,
    appData: appReducer,
    app: appSettingReducer,
  },
});
