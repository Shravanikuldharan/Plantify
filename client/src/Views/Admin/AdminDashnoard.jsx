import React from "react";

function AdminDashboard() {
    // Get logged in admin info from localStorage
    const admin = JSON.parse(localStorage.getItem("loggedInUser"));

    return (
        <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
            <div className="w-[400px] bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Admin Dashboard
                </h1>

                <p className="text-gray-700 text-center mb-6">
                    Welcome, <span className="font-semibold">{admin?.name}</span> 👋
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => (window.location.href = "/admin/users")}
                        className="w-full bg-yellow-600 text-white py-3 rounded-md font-semibold hover:bg-yellow-700 transition"
                    >
                        Manage Users
                    </button>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                        Add New Plant
                    </button>

                    <button className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition">
                        Manage All Plants
                    </button>

                    <button className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition">
                        View Orders
                    </button>

                    <button className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;