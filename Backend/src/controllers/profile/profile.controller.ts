import type { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../../model/user.js";
import { uploadImageToCloudinary } from "../../helper/upload.cloudinary.js";
import blogModel from "../../model/blog.js";
import cloudinary from "../../util/cloudinary.js";

export const getBlogsByCreatedUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const sortBy = req.query.sortBy === "oldest" ? 1 : -1;

    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id",
        });
    }

    const skip = (page - 1) * limit;

    const query:any = {
        createdBy: new mongoose.Types.ObjectId(userId as string),
    };

    if(req.body.visibility){
        query.visiblity = req.body.visibility === "true" ? true : false;
    }

    const [blogs, totalBlogs] = await Promise.all([
        blogModel
            .find(query)
            .populate("createdBy", "name email profileImage")
            .sort({ createAt: sortBy })
            .skip(skip)
            .limit(limit),

        blogModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalBlogs / limit);

    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: blogs,

        pagination: {
            totalBlogs,
            totalPages,
            currentPage: page,
            limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },

        sort: {
            order: sortBy === 1 ? "oldest" : "newest",
            field: "createAt",
        },
    });
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id",
        });
    }

    const user = await userModel
        .findById(userId)
        .select("-password -forgotPasswordToken -emailVerificationCode");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
};

export const getUserProfile = async (req: Request, res: Response) => {
    const { userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id",
        });
    }

    const user = await userModel
        .findById(userId)
        .select("-password -forgotPasswordToken -emailVerificationCode").lean();

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
};

export const updateProfile = async (req: Request, res: Response) => {
    const { userId } = req.user;

    const {
        fistName,
        lastName,
        age,
        gender,
        bio,
    } = req.body;

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

    if (req.file) {

        if (user.profile?.publicId) {
            await cloudinary.uploader.destroy(
                user.profile.publicId
            );
        }

        const uploadProfileImage = await uploadImageToCloudinary({
            filePath: req.file.path,
            folder: "profile-images",
            publicId: `profile-${userId}-${Date.now()}`,
        });

        user.profile = {
            url: uploadProfileImage.secure_url,
            publicId: uploadProfileImage.public_id,
        };
    }

    if (fistName !== undefined) {
        user.firstName = fistName;
    }
    if (lastName !== undefined) {
        user.lastName = lastName;
    }
    if (age != undefined) {
        user.age = Number(age);
    }
    if (gender != undefined) {
        user.gender = gender
    }

    if (bio !== undefined) {
        user.bio = bio;
    }


    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: user,
    });
};

export const updateUserName = async (req: Request, res: Response) => {
    const { userId } = req.user;

    const { userName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id",
        });
    }

    if (!userName || !userName.trim()) {
        return res.status(400).json({
            success: false,
            message: "Name is required",
        });
    }

    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const existingUser = await userModel.findOne({
        name: userName.trim(),
        _id: { $ne: userId },
    });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Username already exists",
        });
    }

    user.userName = userName.trim();

    await user.save();

    res.status(200).json({
        success: true,
        message: "Username updated successfully",
        data: user,
    });
};

export const deleteProfile = async (req: Request, res: Response) => {
    const { userId } = req.user;

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

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "Profile deleted successfully",
    });
};

export const deleteProfileImage = async (req: Request, res: Response) => {
    const { userId } = req.user;

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

    if (!user.profile?.publicId) {
        return res.status(400).json({
            success: false,
            message: "Profile image not found",
        });
    }

    await cloudinary.uploader.destroy(
        user.profile.publicId
    );

    user.profile = {
        url: "https://res.cloudinary.com/dnrifzem4/image/upload/v1779265282/q5sejwus4g2uxvsjoaub.webp",
        publicId:""
    };

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile image deleted successfully",
    });
};