import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, KeyRound, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../features/hook";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {resetPassword} from "../../../api/auth"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  forgotPasswordCode: z
    .string()
    .min(6, "Code must be at least 6 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const {email}  = useAppSelector(state => state.forgotPassword);
  const navigate = useNavigate();

  useEffect(() =>{
    if(email === ""){
      navigate("/forgot-password")
    }
  } ,[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });


  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      dispatch(resetPassword(data));
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-orange-600">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the code sent to your email and set a new password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                readOnly
                {...register("email")}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                placeholder="Enter 6-digit code"
                {...register("forgotPasswordCode")}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none ${
                  errors.forgotPasswordCode
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />
            </div>
            {errors.forgotPasswordCode && (
              <p className="text-xs text-red-500 mt-1">
                {errors.forgotPasswordCode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none ${
                  errors.password ? "border-red-400" : "border-gray-300"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/signin"
            className="text-sm text-orange-500 hover:underline"
          >
            Back to Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;