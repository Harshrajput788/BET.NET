import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { signOutUser } from "../../api/auth";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [onHover, setOnHover] = useState(false);

  const [routes, setRoutes] = useState([["Home", "Blogs", "Categories", "About", "Contact"]]);

  const dispatch = useAppDispatch();

  const { token, user } = useAppSelector(state => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (token) {
      setRoutes([...routes, ["Profile", "Settings"]]);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <header className={`sticky top-0 z-50 duration-500 shadow-md ${isScrolled ? "shadow-lg bg-gray-200" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          <div className="flex cursor-pointer items-center">
            <span onClick={() => navigate("/")} className="text-3xl font-bold text-orange-500">
              BET<span className="text-gray-800">.NET</span>
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/blogs">
              Blogs
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/about">
              About
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/contact">
              Contact
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <div onMouseLeave={() => { setOnHover(false) }} onMouseEnter={() => { setOnHover(true) }} className="w-10 bg-orange-500 justify-center items-center flex text-xl cursor-pointer rounded-full h-10">
                  <img src={user?.profile?.url ? user.profile?.url : "/default-profile.png"} alt="Profile" />
                </div>
                <Link to={"/add-blog"}>
                  <button className="bg-orange-500 w-28 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition">
                    Add Blog
                  </button>
                </Link>
                {
                  onHover && (
                    <div onMouseEnter={() => { setOnHover(true) }} onMouseLeave={() => setOnHover(false)} className="absolute top-12 w-48 bg-white rounded-md shadow-lg py-2">
                      <Link to="/profile" className="block px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100">Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100">Settings</Link>
                      <button className="flex justify-start w-full px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100" onClick={() => dispatch(signOutUser())}>Sign Out</button>
                    </div>
                  )
                }
              </>
            ) : (
              <Link to={"/signin"}>
                <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition">
                  Sign In
                </button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/blogs">
              Blogs
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/categories">
              Categories
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/about">
              About
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/contact">
              Contact
            </NavLink>

            {token ? (
              <>
                <NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/profile">
                  Profile
                </NavLink>
                {!user.verified && (<NavLink className={({ isActive }) => isActive ? "text-orange-500  font-medium hover:text-orange-500 transition" : " text-gray-700 font-medium hover:text-orange-500 transition"} to="/verify-email">
                  Verify Email
                </NavLink>)}
                <button className="mt-2 bg-orange-500 w-28 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                  Sign Out
                </button>
                <Link to={"/add-blog"}>
                  <button className="bg-orange-500 w-28 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition">
                    Add Blog
                  </button>
                </Link>
              </>
            ) : (
              <Link to={"/signin"}>
                <button className="bg-orange-500 w-28 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition">
                  Sign In
                </button>
              </Link>

            )}


          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;