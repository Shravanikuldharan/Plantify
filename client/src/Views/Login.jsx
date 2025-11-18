import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        user
      );

      if (response?.data?.success) {
        alert("Login successful!");

        localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));

        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[350px] bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mb-2">* {error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;