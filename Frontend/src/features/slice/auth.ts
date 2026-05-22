import { createSlice } from "@reduxjs/toolkit";
import { signupUser,signInUser,verifyEmail,getProfile,signOutUser } from "../../api/auth";
import type { IUSER } from "../../types/user";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:{} as IUSER,
        token: localStorage.getItem("token") ? true : false,
        loading:false,
        error:null as string | null,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(signupUser.pending,(state) =>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(signupUser.fulfilled,(state,action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.token = true;
            localStorage.setItem("token", action.payload.token);
        }
        )
        builder.addCase(signupUser.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Signup failed";
        })
        builder.addCase(signInUser.pending,(state) =>{
            state.loading = true;
            state.error = null;
        }
        )
        builder.addCase(signInUser.fulfilled,(state,action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.token = true;
            localStorage.setItem("token", action.payload.token);
        })
        builder.addCase(signInUser.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Signin failed";
        })
        builder.addCase(verifyEmail.pending,(state) =>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(verifyEmail.fulfilled,(state) =>{
            state.loading = false;
            state.user = {...state.user,verified:true};
            state.token = true;
        })
        builder.addCase(verifyEmail.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Email verification failed";
        })
        builder.addCase(getProfile.pending,(state) =>{
            state.loading = true;
            state.error = null;
        }
        )
        builder.addCase(getProfile.fulfilled,(state,action) =>{
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(getProfile.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Failed to fetch profile";
        })
        builder.addCase(signOutUser.pending,(state) =>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(signOutUser.fulfilled,(state) =>{
            state.loading = false;
            state.user = {} as any;
            state.token = false;
            localStorage.removeItem("token");
        })
        builder.addCase(signOutUser.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Sign out failed";
        })  
    }
});

export default authSlice.reducer;