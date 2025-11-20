import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { FiUser } from "react-icons/fi";
import logo from "../assets/logo.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem("loggedInUser");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase();

  const navLinkStyle = (path) =>
    `relative hover:text-green-700 transition ${location.pathname === path ? "text-green-700 font-semibold" : ""
    }`;

 return (
  <nav className="bg-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex justify-between items-center">

      <Link to="/" className="flex items-center space-x-2 group">
        <img src={logo} className="h-12 object-contain transition-transform duration-300 group-hover:scale-105" alt="Logo" />
        <h1 className="text-3xl font-extrabold text-green-700 tracking-wide group-hover:text-green-800 transition">
          Plantify
        </h1>
      </Link>

      <div className="hidden md:flex items-center text-[18px] space-x-8 text-gray-700 font-medium">

        <Link to="/" className={navLinkStyle("/") + " hover:text-green-700"}>
          Home
        </Link>

        <Link to="/about" className={navLinkStyle("/about") + " hover:text-green-700"}>
          About
        </Link>

        <Link to="/plants" className={navLinkStyle("/plants") + " hover:text-green-700"}>
          Plants
        </Link>

        <Link to="/cart" className={navLinkStyle("/cart") + " hover:text-green-700"}>
          Cart
        </Link>

        {!user ? (
          <Link
            to="/login"
            className="bg-green-600 cursor-pointer text-white font-semibold px-2 py-2 sm:px-4 sm:py-2 rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            Login
          </Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-green-600 cursor-pointer  text-white w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shadow-lg hover:shadow-xl transition duration-200"
            >
              {userInitial}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border rounded-xl py-2 animate-fadeIn">
                <div className="px-4 pb-2 text-gray-600 text-sm border-b">
                  Hello, <span className="font-semibold">{user.name}</span>
                </div>

                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                >
                  Profile
                </Link>

                <Link
                  to="/wishlist"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                >
                  Wishlist
                </Link>

                <Link
                  to="/my-orders"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    <style>
      {`
        .animate-fadeIn {
          animation: fadeIn 0.18s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
    </style>
  </nav>
);

}

export default Navbar;