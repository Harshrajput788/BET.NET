import React from "react";

const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      
      <div className="h-48 bg-orange-100" />

      <div className="p-6 space-y-4">
        <div className="h-4 w-24 bg-orange-200 rounded" />
        <div className="h-5 w-3/4 bg-orange-200 rounded" />
        <div className="h-4 w-full bg-orange-100 rounded" />
        <div className="h-4 w-5/6 bg-orange-100 rounded" />
        <div className="h-4 w-20 bg-orange-200 rounded" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;