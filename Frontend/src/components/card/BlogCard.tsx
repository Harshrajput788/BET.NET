import type { FC } from "react";
import type { IBLOG } from "../../types/blog";
import { useNavigate } from "react-router-dom";

interface Props {
  blog: IBLOG;
}

const BlogCard: FC<Props> = ({ blog }) => {

    const navigate = useNavigate();
    
    const navigateToBlog = () => {
        navigate(`/blogs/${blog._id}`);
    };

  return (
    <div onClick={navigateToBlog} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={blog.coverImage.url}
        alt={blog.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-gray-600 mt-2 text-sm line-clamp-3">
          {blog.content}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
          <span>
            {new Date(blog.createAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            👁️ {blog.visits}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;