import { Router } from "express";
import { asyncHandler } from "../../util/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, searchBlogsByTitle, updateBlog } from "../../controllers/blog/blog.js";
import { uploadProfileImageMulter } from "../../middleware/multer.js";


const blogRouter = Router();

blogRouter.get("/",asyncHandler(getAllBlogs));
blogRouter.get("/:blogId",asyncHandler(getBlogById));
blogRouter.get("/search",asyncHandler(searchBlogsByTitle));
blogRouter.post("/",authenticate,uploadProfileImageMulter.single("coverImage"),asyncHandler(createBlog));
blogRouter.patch("/:blogId",authenticate,uploadProfileImageMulter.single("update"),asyncHandler(updateBlog));
blogRouter.delete("/:blogId",authenticate,asyncHandler(deleteBlog));

export default blogRouter;