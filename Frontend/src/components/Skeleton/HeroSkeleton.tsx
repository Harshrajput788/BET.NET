import React from "react";

const HeroSkeleton: React.FC = () => {
  return (
    <section className="bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-pulse">

        {/* Text */}
        <div className="space-y-6">
          <div className="h-10 w-3/4 bg-orange-200 rounded" />
          <div className="h-10 w-2/3 bg-orange-200 rounded" />
          <div className="h-5 w-full bg-orange-100 rounded" />
          <div className="h-5 w-5/6 bg-orange-100 rounded" />

          <div className="flex gap-4 mt-6">
            <div className="h-12 w-40 bg-orange-300 rounded-lg" />
            <div className="h-12 w-40 bg-orange-200 rounded-lg" />
          </div>
        </div>

        {/* Image */}
        <div className="h-80 bg-orange-200 rounded-xl" />
      </div>
    </section>
  );
};

export default HeroSkeleton;