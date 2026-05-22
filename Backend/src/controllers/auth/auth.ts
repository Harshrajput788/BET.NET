import type { Request, Response } from "express";
import userModel, { type IUSER } from "../../model/user.js";
import mongoose from "mongoose";
import argon2 from 'argon2'
import { createToken } from "../../util/token.js";
import cloudinary from "../../util/cloudinary.js";
import { sendVerificationCode, sendForgotPasswordEmail } from "../../helper/sendEmail.js";
import { uploadImageToCloudinary } from "../../helper/upload.cloudinary.js";

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, email, password } = req.body as IUSER

  if (!firstName || !lastName || !userName || !email || !password) {
    return res.status(400).json({
      message: "Plaese Fill all the fields",
      success: false
    })
  }

  const user = await userModel.findOne({ $or: [{ email }, { userName }] });

  if (user) {
    return res.status(400).json({
      message: "User is already register with this username or email",
      success: false
    })
  }

  const newUser = new userModel({
    firstName,
    lastName,
    email,
    userName,
    password: await argon2.hash(password)
  })

  await newUser.save();

  const token = await createToken(newUser);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).status(201).json({
    message: "User create successfully",
    success: true,
    data: {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      userName: newUser.userName,
      profile: newUser.profile,
      verified: newUser.verified
    },
    token,
  });

}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Plaese Fill all the fields",
      success: false
    })
  }

  const user = await userModel.findOne({ $or: [{ email }, { userName: email }] });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false
    })
  }

  const matchPassword = await argon2.verify(user.password, password);

  if (!matchPassword) {
    return res.status(401).json({
      message: "Wrong Password",
      success: false
    })
  }

  const token = await createToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).status(200).json({
    message: "LogIn successfully",
    success: true,
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      profile: user.profile,
      verified: user.verified
    },
    token,
  });

}

export const signout = async (req: Request, res: Response) => {
  res.clearCookie("token").status(200).json({ message: "User logout successfully", success: true });
}

export const sendEmailVerificationCode = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const user = await userModel.findOne({
    _id: userId,
    verified: false,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found or already verified",
    });
  }

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  sendVerificationCode(user.email, verificationCode);

  user.verifictionCode = verificationCode;
  user.expiarVerifictionCode = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { verificationCode } = req.body;

  if (!verificationCode) {
    return res.status(400).json({
      success: false,
      message: "Verification code is required",
    });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (
    !user.expiarVerifictionCode ||
    Date.now() > user.expiarVerifictionCode.getTime()
  ) {
    return res.status(400).json({
      success: false,
      message: "Verification code expired",
    });
  }

  if (verificationCode !== user.verifictionCode) {
    return res.status(401).json({
      success: false,
      message: "Invalid verification code",
    });
  }

  user.verified = true;

  user.verifictionCode = undefined;

  user.expiarVerifictionCode = undefined;

  const token = await createToken(user);

  await user.save();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).status(200).json({
    success: true,
    message: "User verified successfully",
    token
  });
};

export const sendForgotPasswordCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Please provide email",
      success: false,
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  const forgotPasswordCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  await sendForgotPasswordEmail(email, forgotPasswordCode);

  user.forgotPassword = forgotPasswordCode;

  user.expairForgotPassword = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await user.save();

  return res.status(200).json({
    message: "Forgot password code sent to your email address",
    success: true,
    email
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email, forgotPasswordCode, password } = req.body;

  if (!email || !forgotPasswordCode || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.forgotPassword !== forgotPasswordCode) {
    return res.status(400).json({
      success: false,
      message: "Invalid forgot password code",
    });
  }

  if (
    !user.expairForgotPassword ||
    user.expairForgotPassword < new Date()
  ) {
    return res.status(400).json({
      success: false,
      message: "Forgot password code expired",
    });
  }

  const hashedPassword = await argon2.hash(password);

  user.password = hashedPassword;

  user.forgotPassword = undefined;
  user.expairForgotPassword = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
};

export const uploadProfileImage = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Profile image is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
    });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }


  if (user.profile?.publicId) {
    await cloudinary.uploader.destroy(
      user.profile.publicId
    );
  }

  const uploadedImage = await uploadImageToCloudinary({
    filePath: req.file.path,
    folder: "profile-images",
    publicId: `profile-${user._id}-${Date.now()}`,
  });

  user.profile = {
    publicId: uploadedImage.public_id,
    url: uploadedImage.secure_url,
  };

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile image updated successfully",
    data: user.profile,
  });
};