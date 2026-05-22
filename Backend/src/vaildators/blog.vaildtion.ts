import Joi from "joi";
import mongoose from "mongoose";

const objectIdValidation = (value: string, helpers: Joi.CustomHelpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }

    return value;
};

export const createBlogValidation = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(200)
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title cannot exceed 200 characters",
        }),

    content: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Content is required",
        }),

    createdBy: Joi.string()
        .custom(objectIdValidation)
        .required()
        .messages({
            "any.required": "CreatedBy is required",
            "any.invalid": "Invalid user id",
        }),

    visibility: Joi.boolean()
        .required()
        .messages({
            "any.required": "Visibility is required",
        }),

    tags: Joi.array()
        .items(
            Joi.string()
                .trim()
                .min(1)
        )
        .optional(),
});

export const updateBlogValidation = Joi.object({
    title: Joi.string().trim().min(3).max(200),

    content: Joi.string().trim(),

    createdBy: Joi.string().custom(objectIdValidation),

    visibility: Joi.boolean(),

    coverImage: Joi.object({
        url: Joi.string().uri(),

        publicId: Joi.string().trim(),
    }),

    tags: Joi.array().items(
        Joi.string().trim().min(1)
    ),
});