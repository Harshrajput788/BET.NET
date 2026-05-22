import { Routes, Route } from "react-router-dom";
import AppRoutes from "./pages/Routes/Routes";
import Signup from "./pages/Auth/Signup/SignUp";
import { ToastContainer } from "react-toastify";
import Signin from "./pages/Auth/Signin/Signin";
import VerifyEmail from "./pages/Auth/Verify-email/VerifyEmail";
import AuthProtection from "./components/Protect/AuthProtection";
import Protect from "./components/Protect/Protect";
import { useAppDispatch } from "./features/hook";
import SendForgotPassword from "./pages/Auth/ForgotPassword/SendForgotPassword";
import { useEffect } from "react";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import { getProfile } from "./api/auth";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/signup"
          element={
            <AuthProtection>
              <Signup />
            </AuthProtection>
          }
        />

        <Route
          path="/signin"
          element={
            <AuthProtection>
              <Signin />
            </AuthProtection>
          }
        />

        <Route
          path="/verify-email"
          element={
            <Protect>
              <VerifyEmail />
            </Protect>
          }
        />
        <Route path="/forgot-password" element={<AuthProtection><SendForgotPassword /></AuthProtection>} />
        <Route path="/reset-password" element={<AuthProtection><ForgotPassword /></AuthProtection>} />

        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </>
  );
}

export default App;