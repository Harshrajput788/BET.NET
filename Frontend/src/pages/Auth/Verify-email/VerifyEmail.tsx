import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailCodeSchema,type VerifyEmailCodeFormData } from "../../../schemas/auth/Verify-email";
import { sendVerificationCode,verifyEmail } from "../../../api/auth";
import { useAppDispatch } from "../../../features/hook";
import { useNavigate } from "react-router-dom";

const RESEND_TIME = 300; 

const VerifyEmail: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailCodeFormData>({
    resolver: zodResolver(verifyEmailCodeSchema),
  });

  const disptach = useAppDispatch();

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState<number>(RESEND_TIME);

  useEffect(() =>{
    sendVerificationCode(); 
  },[])

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: VerifyEmailCodeFormData) => {
    try {
      await disptach(verifyEmail(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  const handleResend = () => {
    console.log("Resend verification code");
    setTimeLeft(RESEND_TIME);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Verify email"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Verify Your <span className="text-orange-500">Email</span>
          </h2>

          <p className="mt-3 text-gray-600">
            Enter the 6-digit code sent to your email address.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div>
              <input
                {...register("verificationCode")}
                placeholder="Enter 6-digit code"
                maxLength={6}
                inputMode="numeric"
                className="w-full text-center tracking-widest text-lg px-4 py-4 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
              {errors.verificationCode && (
                <p className="text-sm text-red-500 mt-1 text-center">
                  {errors.verificationCode.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {timeLeft > 0 ? (
              <>
                Resend code in{" "}
                <span className="text-orange-500 font-medium">
                  {formatTime(timeLeft)}
                </span>
              </>
            ) : (
              <button
                onClick={handleResend}
                className="text-orange-500 font-medium hover:underline"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;