import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        user
      );

      if (response?.data?.success) {
        alert("Signup successful!");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[350px] bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

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

        <input
          type="text"
          placeholder="Phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Address"
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          className="w-full p-3 mb-3 h-[70px] rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mb-2">* {error}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;