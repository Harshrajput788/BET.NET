import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify"
import type { SignupFormData } from "../schemas/auth/signup.schema";
import type { SigninFormData } from "../schemas/auth/signin.schema";
import type { VerifyEmailCodeFormData } from "../schemas/auth/Verify-email";

export const signupUser = createAsyncThunk("Signup User", async (userData: SignupFormData) => {
    try {
        const res = await axios.post("http://localhost:3001/api/v1/auth/signup", userData, { withCredentials: true })
        toast.success("Signup successful!")
        return res.data;
    } catch (error:any) {
        toast.error(error.response?.data?.message || "Failed to send verification code. Please try again.")
        throw error;
    }
})

export const signInUser = createAsyncThunk("SignIn User", async (userData: SigninFormData) => {
    try {
        const res = await axios.post("http://localhost:3001/api/v1/auth/signin", userData, { withCredentials: true })
        toast.success("Signin successful!")
       return {
        user: res.data.data,
        token: res.data.token,
      };
    } catch (error:any) {
        toast.error(error.response?.data?.message || "Signin failed. Please check your credentials and try again.")
        throw error;
    }
})

export const sendVerificationCode = async () => {
    try {
        const res = await axios.post("http://localhost:3001/api/v1/auth/send-email-verifiction-code", {}, { withCredentials: true });
        toast.success("Verification code sent to your email!")
        return res.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to send verification code. Please try again.")
        throw error;
    }
}

export const verifyEmail = createAsyncThunk("Verify Email", async (data: VerifyEmailCodeFormData) => {
    try {
        const res = await axios.post("http://localhost:3001/api/v1/auth/verify-email", data, { withCredentials: true });
        toast.success("Email verified successfully!")
        return res.data;
    } catch (error:any) {
        toast.error(error.response?.data?.message || "Email verification failed. Please check the code and try again.")
        throw error;
    }
})

export const getProfile = createAsyncThunk("Get Profile", async () => {
    const res = await axios.get("http://localhost:3001/api/v1/user/", { withCredentials: true });
    console.log(res)
    return res.data.data;
})

export const signOutUser = createAsyncThunk("Sign Out User", async () => {
    try {
        await axios.post("http://localhost:3001/api/v1/auth/signout", {}, { withCredentials: true });
        toast.success("Signed out successfully!")
        return;
    } catch (error:any) {
        toast.error(error.response?.data?.message || "Sign out failed. Please try again.")
        throw error;
    }
})

export const sendForgotPasswordEmail = createAsyncThunk("Send Forgot Password Email", async (email: string) => {
    try {
        const res = await axios.post("http://localhost:3001/api/v1/auth/send-forgot-password-code", { email }, { withCredentials: true });
        toast.success("Forgot password email sent successfully!")
        return res.data.email;
    } catch (error:any) {
        toast.error(error.response?.data?.message || "Failed to send forgot password email. Please try again.")
        throw error;
    }
})

export const resetPassword = createAsyncThunk("Reset Password", async (data: { email: string, forgotPasswordCode: string, password: string }) => {
    try {
        const res = await axios.post("http://localhost:3001/api/v1/auth/reset-password", data, { withCredentials: true });
        toast.success("Password reset successfully!")
        return res.data;
    } catch (error:any) {
        toast.error(error.response?.data?.message || "Failed to reset password. Please check the code and try again.")
        throw error;
    }
})