import React from "react";
import { Link } from "react-router";
import { FaUsers, FaPlusCircle, FaLeaf, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-1 mb-8">
          Welcome, <span className="font-semibold">{admin?.name}</span> 👋
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <Link to="/admin/users">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-[1.02] transition">
              <FaUsers className="text-yellow-600 text-4xl mb-4" />
              <h2 className="text-xl font-bold mb-2">View Users</h2>
              <p className="text-sm text-gray-600">
                Manage registered users and their activities.
              </p>
            </div>
          </Link>

          <Link to="/admin/add-plant">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-[1.02] transition">
              <FaPlusCircle className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Add New Plant</h2>
              <p className="text-sm text-gray-600">
                Upload new plant details and add to store.
              </p>
            </div>
          </Link>

          <Link to="/admin/manage-plants">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-[1.02] transition">
              <FaLeaf className="text-green-600 text-4xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Manage Plants</h2>
              <p className="text-sm text-gray-600">
                Edit, update or remove existing plants.
              </p>
            </div>
          </Link>

          <Link to="/admin/manage-orders">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-[1.02] transition">
              <FaShoppingCart className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Manage Orders</h2>
              <p className="text-sm text-gray-600">
                View and update customer orders.
              </p>
            </div>
          </Link>

          <div
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              window.location.href = "/login";
            }}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-[1.02] transition"
          >
            <FaSignOutAlt className="text-red-600 text-4xl mb-4" />
            <h2 className="text-xl font-bold mb-2">Logout</h2>
            <p className="text-sm text-gray-600">
              Logout from admin account securely.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;