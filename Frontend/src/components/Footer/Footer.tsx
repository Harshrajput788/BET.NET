import React from "react";
import {Mail} from "lucide-react";
import { FaFacebookSquare ,FaInstagramSquare,FaLinkedin} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              Blog<span className="text-gray-800">Sphere</span>
            </h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              A modern blogging platform to share ideas, tutorials,
              and stories with the world.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Blogs", "Categories", "About", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-orange-500 transition"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {["Technology", "Programming", "Design", "AI", "Career"].map(
                (category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-orange-500 transition"
                    >
                      {category}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get the latest blog updates.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm border border-orange-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-100 mt-10 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} BlogSphere. All rights reserved.
            </p>

            <div className="flex space-x-4">
              {[FaFacebookSquare, FaSquareXTwitter, FaInstagramSquare, FaLinkedin, Mail].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-500 hover:text-orange-500 transition"
                  >
                    <Icon size={20} />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;