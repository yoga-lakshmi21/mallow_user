import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/login"; 

export const store = configureStore({
  reducer: {
    auth: loginReducer,
  },
});
