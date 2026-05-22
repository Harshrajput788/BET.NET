import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  visibility: z.boolean(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  coverImage: z
    .instanceof(File, { message: "Cover image is required" })
});

export type BlogFormData = z.infer<typeof blogSchema>;