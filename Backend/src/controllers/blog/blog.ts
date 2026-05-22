import type { Request, Response } from "express";
import blogModel, { type IBLOG } from "../../model/blog.js";
import mongoose from "mongoose";
import { uploadImageToCloudinary } from "../../helper/upload.cloudinary.js";
import cloudinary from "../../util/cloudinary.js";


export const getAllBlogs = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const sortBy = req.query.sortBy === "oldest" ? 1 : -1;

    const skip = (page - 1) * limit;

    const [blogs, totalBlogs] = await Promise.all([
        blogModel
            .find({ visibility: true })
            .populate("createdBy", "name email profileImage")
            .sort({ createAt: sortBy })
            .skip(skip)
            .limit(limit),

        blogModel.countDocuments({ visibility: true }),
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

export const searchBlogsByTitle = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const sortBy = req.query.sortBy === "oldest" ? 1 : -1;

    const search = (req.query.search as string)?.trim();

    if (!search) {
        return res.status(400).json({
            success: false,
            message: "Search query is required",
        });
    }

    const skip = (page - 1) * limit;

    const searchQuery = {
        visibility: true,
        title: {
            $regex: search,
            $options: "i",
        },
    };

    const [blogs, totalBlogs] = await Promise.all([
        blogModel
            .find(searchQuery)
            .populate("createdBy", "name email profileImage")
            .sort({ createAt: sortBy })
            .skip(skip)
            .limit(limit),

        blogModel.countDocuments(searchQuery),
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

        search,
    });
};

export const getBlogById = async (req: Request, res: Response) => {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId as string)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blog id",
        });
    }

    const blog = await blogModel
        .findOne({
            _id: new mongoose.Types.ObjectId(blogId as string),
            visibility: true,
        })
        .populate("createdBy", "name email profileImage");

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    }

    blog.visits += 1;

    await blog.save();

    res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        data: blog,
    });
};

export const createBlog = async (req: Request, res: Response) => {
    const { title, content, visibility = true, tags } = req.body as IBLOG

    const { userId } = req.user;

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

    const uploadCoverImage = await uploadImageToCloudinary({
        filePath: req.file.path,
        folder: "blog-cover-images",
        publicId: `profile-${userId}-${Date.now()}`,

    })

    const coverImage = {
        url: uploadCoverImage.secure_url,
        publicId: uploadCoverImage.public_id
    }

    const newBlog = new blogModel({
        title,
        content,
        visibility,
        tags,
        createdBy: userId,
        createAt: Date.now(),
        coverImage
    });

    await newBlog.save();

    res.status(201).json({
        data: newBlog,
        message: "Blog created successfully",
        success: true
    })

}

export const updateBlog = async (req: Request, res: Response) => {
    const { blogId } = req.params;

    const { title, content, visibility, tags } = req.body as IBLOG;

    const { userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(blogId as string)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blog id",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id",
        });
    }

    const blog = await blogModel.findById(blogId);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    }

    if (blog.createdBy.toString() !== userId) {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to update this blog",
        });
    }

    if (req.file) {

        if (blog.coverImage?.publicId) {
            await cloudinary.uploader.destroy(
                blog.coverImage.publicId
            );
        }

        const uploadCoverImage = await uploadImageToCloudinary({
            filePath: req.file.path,
            folder: "blog-cover-images",
            publicId: `blog-${userId}-${Date.now()}`,
        });

        blog.coverImage = {
            url: uploadCoverImage.secure_url,
            publicId: uploadCoverImage.public_id,
        };
    }

    if (title !== undefined) {
        blog.title = title;
    }

    if (content !== undefined) {
        blog.content = content;
    }

    if (visibility !== undefined) {
        blog.visibility = visibility;
    }

    if (tags !== undefined) {
        blog.tags = tags;
    }

    await blog.save();

    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: blog,
    });
};

export const deleteBlog = async (req: Request, res: Response) => {
    const { blogId } = req.params;

    const { userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(blogId as string)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blog id",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id",
        });
    }

    const blog = await blogModel.findById(blogId);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    }

    if (blog.createdBy.toString() !== userId) {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to delete this blog",
        });
    }

    if (blog.coverImage?.publicId) {
        await cloudinary.uploader.destroy(
            blog.coverImage.publicId
        )
    }

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });
};

