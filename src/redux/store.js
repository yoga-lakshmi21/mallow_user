import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../redux/login';
import usersReducer from '../redux/user';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: loginReducer,
    },
});
