import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth"
import forgotPasswordSlice from ".//slice/forgotPassword"

export const store = configureStore({
    reducer: {
        auth:authSlice,
        forgotPassword: forgotPasswordSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;