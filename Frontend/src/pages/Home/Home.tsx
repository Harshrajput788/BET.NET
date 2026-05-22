import React from "react";
import { useEffect,useState } from "react";
import HeroSkeleton from "../../components/Skeleton/HeroSkeleton";
import BlogCardSkeleton from "../../components/Skeleton/BlogSkeleton";

const Home: React.FC = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <HeroSkeleton />
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <main className="bg-white">

      <section className="bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Discover Ideas,
              <span className="text-orange-500"> Stories</span> & Knowledge
            </h1>
            <p className="mt-6 text-gray-600 text-lg">
              Read high-quality blogs on technology, programming, design,
              AI, and career growth — written by passionate creators.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition">
                Explore Blogs
              </button>
              <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-100 transition">
                Start Writing
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Blogging"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Featured <span className="text-orange-500">Blogs</span>
          </h2>
          <p className="text-gray-600 text-center mt-3">
            Hand-picked articles to inspire and inform you
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?sig=${item}`}
                  alt="Blog cover"
                  className="h-48 w-full object-cover"
                />

                <div className="p-6">
                  <span className="text-sm text-orange-500 font-medium">
                    Technology
                  </span>

                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    How Modern Web Apps Are Built
                  </h3>

                  <p className="mt-3 text-gray-600 text-sm">
                    Learn the architecture, tools, and best practices used
                    in building scalable web applications.
                  </p>

                  <button className="mt-4 text-orange-500 font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Browse by <span className="text-orange-500">Category</span>
          </h2>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              "Programming",
              "Design",
              "AI",
              "Career",
              "Lifestyle",
            ].map((category) => (
              <div
                key={category}
                className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition cursor-pointer"
              >
                <p className="font-semibold text-gray-800">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-orange-500 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6">

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Share Your Knowledge with the World
            </h2>

            <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-100 transition">
              Create Your First Blog
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;