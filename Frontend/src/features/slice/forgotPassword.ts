import { createSlice } from "@reduxjs/toolkit";
import { sendForgotPasswordEmail,resetPassword } from "../../api/auth";

export const forgotPasswordSlice = createSlice({
    name:"forgotPassword",
    initialState:{
        email:"",
        loading:false,
        error:null as string | null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(sendForgotPasswordEmail.pending,(state) =>{ 
            state.loading = true;
            state.error = null;
        })
        builder.addCase(sendForgotPasswordEmail.fulfilled,(state,action) =>{
            state.loading = false;
            state.email = action.payload;
        })
        builder.addCase(sendForgotPasswordEmail.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Failed to send forgot password email";
        })
        builder.addCase(resetPassword.pending,(state) =>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(resetPassword.fulfilled,(state) =>{
            state.loading = false;
            state.email = "";
        })  
        builder.addCase(resetPassword.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Failed to reset password";
        })
    }
});

export default forgotPasswordSlice.reducer; 