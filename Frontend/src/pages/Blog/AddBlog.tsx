import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, type BlogFormData } from "../../schemas/blog/blog";
import { useState } from "react";
import {useCreateBlog} from '../../api/blog'

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      visibility: true,
      tags: [],
    },
  });

  const { mutate: createBlogMutation } = useCreateBlog();

  const [tagInput, setTagInput] = useState("");
  const tags = watch("tags");
  const coverImage = watch("coverImage");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setValue("tags", [...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setValue("tags", tags.filter((t) => t !== tag));
  };

  const onSubmit = async (data: BlogFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("visibility", String(data.visibility));
    data.tags.forEach((tag) => formData.append("tags", tag));
    formData.append("coverImage", data.coverImage); 

    createBlogMutation(formData);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label">Title:</label>
            <input {...register("title")} className="input bg-gray-200 focus:outline-blue-400 rounded-xs h-8 mx-2" />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          <div>
            <label className="label mx-2">Cover Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && setValue("coverImage", e.target.files[0])
              }
            />
            {errors.coverImage && (
              <p className="error">{errors.coverImage.message}</p>
            )}

            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                className="mt-3 max-h-60 rounded-lg object-cover"
              />
            )}
          </div>

          <div>
            <label className="label">Content</label>
            <textarea
              rows={8}
              {...register("content")}
              className="input bg-gray-200 focus:outline-blue-400 rounded-xs mx-2"
            />
            {errors.content && (
              <p className="error">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label className="label">Tags</label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="input bg-gray-200 focus:outline-blue-400 rounded-xs h-8 mx-2"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-orange-500 text-white px-4 rounded-md"
              >
                Add
              </button>
            </div>

            {errors.tags && <p className="error">{errors.tags.message}</p>}

            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("visibility")}
              className="accent-orange-500"
            />
            <span>Publicly visible</span>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;