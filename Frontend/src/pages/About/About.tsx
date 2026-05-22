import React from "react";

const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-orange-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl font-extrabold text-orange-600 leading-tight">
              About Our Blog
            </h1>
            <p className="mt-4 text-gray-700 text-lg">
              A place where ideas, technology, and creativity come together.
              We share knowledge, stories, and experiences to inspire curious
              minds.
            </p>
            <p className="mt-4 text-gray-600">
              Built with passion for learning, writing, and community-driven
              growth.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="About Blog"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Our Mission
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-center text-gray-600 text-lg">
          Our mission is to provide high-quality, easy-to-understand content
          that helps developers, creators, and learners grow their skills and
          stay inspired.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Quality Content",
              desc: "Well-researched blogs focused on real-world use cases."
            },
            {
              title: "Community First",
              desc: "Built for learners, by learners."
            },
            {
              title: "Consistent Growth",
              desc: "Always improving, always learning."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-orange-600">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team / Creator Section */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Meet the Creator
          </h2>

          <div className="mt-10 flex flex-col items-center text-center">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              alt="Creator"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
            <h3 className="mt-4 text-xl font-semibold text-orange-600">
              Harsh Singh Chouhan
            </h3>
            <p className="mt-2 text-gray-600 max-w-xl">
              Full Stack Developer passionate about building scalable web
              applications, writing clean code, and sharing knowledge through
              blogging.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">
            Join Our Journey
          </h2>
          <p className="mt-4 text-orange-100 max-w-2xl mx-auto">
            Follow our blog to stay updated with the latest articles, tutorials,
            and insights from the tech world.
          </p>

          <button className="mt-6 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
            Explore Blogs
          </button>
        </div>
      </section>
    </main>
  );
};

export default About;