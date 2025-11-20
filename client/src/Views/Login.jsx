import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import loginImg from "../assets/login.png";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        user
      );

      if (response?.data?.success) {
        toast.success("Login successful!");
        const loggedUser = response.data.user;
        const token = response.data.token;

        localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        if (loggedUser.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
      setError(msg);
    }
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#F6FFF6]">
        <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-10 bg-white">

        <h1 className="text-4xl font-extrabold text-green-700 mb-2 tracking-wide">
          Plantify 🌿
        </h1>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Welcome back! Login to{" "}
          <span className="font-semibold text-green-700">Plantify</span>.
        </p>

        <div className="w-full max-w-md p-6 space-y-4">

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 pl-10 rounded-xl bg-green-50 border border-green-200 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 text-lg" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 pl-10 pr-12 rounded-xl bg-green-50 border border-green-200 outline-none focus:ring-2 focus:ring-green-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-xl cursor-pointer hover:text-green-700"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm -mt-2">* {error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 cursor-pointer bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 hover:shadow-lg transition"
          >
            Login
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-[#E9F8EA]">
        <img
          src={loginImg}
          alt="Plant"
          className="w-[75%] h-auto object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
}

export default Login;