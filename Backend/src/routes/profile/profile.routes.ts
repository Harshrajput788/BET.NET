import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { asyncHandler } from "../../util/asyncHandler.js";
import { deleteProfile, deleteProfileImage, getBlogsByCreatedUser, getUserById, getUserProfile, updateProfile, updateUserName } from "../../controllers/profile/profile.controller.js";
import { uploadProfileImageMulter } from "../../middleware/multer.js";

const profileRouter = Router();

profileRouter.get("/:userId",asyncHandler(getUserById));
profileRouter.get("/",authenticate,asyncHandler(getUserProfile));
profileRouter.get("/blog/:userId",asyncHandler(getBlogsByCreatedUser));
profileRouter.patch("/",authenticate,uploadProfileImageMulter.single("image"),asyncHandler(updateProfile));
profileRouter.patch("/user-name",authenticate,asyncHandler(updateUserName));
profileRouter.delete("/",authenticate,asyncHandler(deleteProfile));
profileRouter.delete("/profile-image",authenticate,asyncHandler(deleteProfileImage));

export default profileRouter;