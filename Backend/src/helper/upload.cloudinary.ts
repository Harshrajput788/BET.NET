import fs from "fs/promises";
import cloudinary from "../util/cloudinary.js";
import type { UploadApiResponse } from "cloudinary";


type UploadFolder = "profile-images" | "blog-cover-images";

interface UploadImageOptions {
    filePath: string;
    folder: UploadFolder;
    publicId?: string;
}

interface UploadImageResponse {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
}

export const uploadImageToCloudinary = async ({
    filePath,
    folder,
    publicId,
}: UploadImageOptions): Promise<UploadImageResponse> => {
    try {
        if (!filePath) {
            throw new Error("File path is required");
        }

        const result: UploadApiResponse =
            await cloudinary.uploader.upload(filePath, {
                folder: `blog-website/${folder}`,

                ...(publicId && {
                    public_id: publicId,
                }),

                resource_type: "image",
                overwrite: true,
                quality: "auto",
                fetch_format: "auto",
                invalidate: true,

                transformation: [
                    {
                        quality: "auto",
                        fetch_format: "auto",
                    },
                ],
            });

        await fs.unlink(filePath);

        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
        };
    } catch (error) {
        if (filePath) {
            try {
                await fs.unlink(filePath);
            } catch (_) { }
        }

        console.log("Cloudinary Upload Error:", error);

        throw new Error("Image upload failed");
    }
};