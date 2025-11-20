import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import signupImg from "../assets/about.png"; 
import toast, { Toaster } from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        user
      );

      if (response?.data?.success) {
       toast.success("Signup successful!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      }
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#F6FFF6]">
        <Toaster position="top-center" reverseOrder={false} />

      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-[#E9F8EA]">
        <img
          src={signupImg}
          alt="Plant"
          className="w-[75%] h-auto object-contain drop-shadow-lg"
        />
      </div>

      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-10 bg-white">

        <h1 className="text-4xl font-extrabold text-green-700 mb-2 tracking-wide">
          Plantify 🌿
        </h1>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Create your account and grow with{" "}
          <span className="font-semibold text-green-700">Plantify</span>.
        </p>

        <div className="w-full max-w-md p-6 space-y-4">

          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-3 pl-10 rounded-xl border border-green-400 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 pl-10 rounded-xl border border-green-400 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 pl-10 pr-12 rounded-xl border border-green-400 outline-none focus:ring-2 focus:ring-green-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-xl cursor-pointer hover:text-green-700"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
            <input
              type="text"
              placeholder="Phone Number"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full p-3 pl-10 rounded-xl border border-green-400 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="relative">
            <FiMapPin className="absolute left-3 top-3 text-green-600 text-xl" />
            <textarea
              placeholder="Full Address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full p-3 pl-10 h-[70px] rounded-xl border border-green-400 outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm -mt-2">* {error}</p>
          )}

          <button
            onClick={handleSignup}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold cursor-pointer hover:bg-green-700 shadow-md hover:shadow-lg transition"
          >
            Create Account
          </button>
        </div>

        <p className="mt-1 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;