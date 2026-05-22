import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET
} = process.env;

if (
  !CLOUD_NAME ||
  !CLOUD_API_KEY ||
  !CLOUD_API_SECRET
) {
  throw new Error("❌ Cloudinary environment variables are missing");
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true
});

export default cloudinary;