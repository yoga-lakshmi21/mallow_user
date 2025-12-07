import { createSlice } from "@reduxjs/toolkit";
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

const user = createSlice({
  name: "users",
  initialState: {
    list: savedUsers,
    search: ""
  },
  reducers: {

    addUser: (state, action) => {
      state.list.push({ id: Date.now(), ...action.payload });
      localStorage.setItem("users", JSON.stringify(state.list));
    },

    updateUser: (state, action) => {
      state.list = state.list.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
      localStorage.setItem("users", JSON.stringify(state.list));
    },

    deleteUser: (state, action) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.list));
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
});

export const { addUser, updateUser, deleteUser, setSearch } = user.actions;
export default user.reducer;
