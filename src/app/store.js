import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import usersSlice from "../features/auth/usersSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        users: usersSlice
    }
})