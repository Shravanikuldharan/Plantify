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
    <nav className="bg-orange-100 shadow border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-10 py-3 flex justify-between items-center">

        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} className="h-14 object-contain" alt="Logo" />
          <h1 className="text-3xl font-bold text-green-700">Plantify</h1>
        </Link>

        <div className="flex items-center text-[18px] space-x-10 text-gray-700 font-medium">

          <Link to="/" className={navLinkStyle("/")}>
            Home
          </Link>

          <Link to="/about" className={navLinkStyle("/about")}>
            About
          </Link>

          <Link to="/plants" className={navLinkStyle("/plants")}>
            Plants
          </Link>

          <Link to="/cart" className={navLinkStyle("/cart")}>
            Cart
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="text-gray-700 text-xl hover:text-green-700 transition"
            >
              <FiUser />
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold hover:bg-green-700 shadow transition duration-200"
              >
                {userInitial}
              </button>

              {/* dropedown for profile */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg border rounded-xl py-2 animate-fadeIn">
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
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">
                    Wishlist
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