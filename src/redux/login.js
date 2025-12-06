import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  error: null,
  isLoggedIn: !!localStorage.getItem("token"),
};

const login = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginFail, logout } = login.actions;
export default login.reducer;
