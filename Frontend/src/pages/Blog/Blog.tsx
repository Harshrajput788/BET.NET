import React from "react";
import { useParams } from "react-router-dom";
import type { IBLOG } from "../../types/blog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const BlogById: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {data, isLoading} = useQuery<IBLOG>({
    queryKey: ['blog', id],
    queryFn: async (): Promise<IBLOG> => {
      const res = await axios.get(`https://bet-net-3.onrender.com/api/v1/blog/${id}`);
      console.log("Fetched blog:", res.data);
      return await res.data.data as IBLOG;
    }
  })


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-64 md:h-104 overflow-hidden">
        <img
          src={data?.coverImage?.url ?? ''}
          alt={data?.title ?? 'blog cover'}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {data.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
          <span>
            By <span className="text-orange-500 font-medium">{data.createdBy.email}</span>
          </span>
          <span>•</span>
          <span>{new Date(data.createAt).toLocaleDateString()}</span>
        </div>

        <article className="prose prose-orange max-w-none">
          {data.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </article>

        <div className="mt-12 p-6 border border-orange-100 bg-orange-50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Enjoyed this article?
          </h3>
          <p className="text-gray-600 mb-4">
            Subscribe to get the latest blog posts directly in your inbox.
          </p>
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogById;
