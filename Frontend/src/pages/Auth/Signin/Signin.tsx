import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema,type SigninFormData } from "../../../schemas/auth/signin.schema";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../features/hook";
import { signInUser } from "../../../api/auth";

const Signin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const {loading} = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  
const onSubmit = async (data: SigninFormData) => {
  try {
    const result = await dispatch(signInUser(data)).unwrap();
    if (result.user && !result.user.verified) {
      navigate("/verify-email");
      return;
    }

    navigate("/");
  } catch (error) {
    console.error("Login failed", error);
  }
};

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Sign in"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome <span className="text-orange-500">Back</span>
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to continue to your blog dashboard.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link to={"/forgot-password"} className="text-sm text-orange-500 cursor-pointer hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-orange-500 cursor-pointer hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;