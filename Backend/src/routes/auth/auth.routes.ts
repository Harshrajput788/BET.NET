import { Router } from "express";
import { signup,signin, signout, sendEmailVerificationCode, verifyEmail, sendForgotPasswordCode, forgotPassword, uploadProfileImage } from "../../controllers/auth/auth.js";
import { asyncHandler } from "../../util/asyncHandler.js";
import { validate } from "../../middleware/vaildtion.js";
import { signupValidation,signinValidation, sendForgotPasswordCodeSchema, forgotPasswordSchema, verifyEmailSchema } from "../../vaildators/auth.vaildtion.js";
import { authenticate } from "../../middleware/authenticate.js";
import { uploadProfileImageMulter } from "../../middleware/multer.js";


const authRouter = Router();

authRouter.post("/signup",validate(signupValidation),asyncHandler(signup));
authRouter.post("/signin",validate(signinValidation),asyncHandler(signin));
authRouter.post('/signout',authenticate,asyncHandler(signout))
authRouter.post("/send-email-verifiction-code",authenticate,asyncHandler(sendEmailVerificationCode));
authRouter.post("/verify-email",authenticate,validate(verifyEmailSchema),asyncHandler(verifyEmail));
authRouter.post("/send-forgot-password-code",validate(sendForgotPasswordCodeSchema),asyncHandler(sendForgotPasswordCode));
authRouter.post("/reset-password",validate(forgotPasswordSchema),asyncHandler(forgotPassword));
authRouter.post("/upload-profile-image",authenticate,uploadProfileImageMulter.single("image"),asyncHandler(uploadProfileImage))

export default authRouter;