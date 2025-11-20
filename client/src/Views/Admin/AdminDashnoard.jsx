import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./../../Components/AdminLayout";

function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem("loggedInUser"));

  const [counts, setCounts] = useState({
    users: 0,
    plants: 0,
    orders: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const token = localStorage.getItem("token");

        const usersRes = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const plantsRes = await axios.get(`${import.meta.env.VITE_API_URL}/plants`);

        const ordersRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/orders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCounts({
          users: usersRes.data.users?.length || 0,
          plants: plantsRes.data.plants?.length || 0,
          orders: ordersRes.data.orders?.length || 0,
        });
      } catch (err) {
        console.log("Count Fetch Error:", err);
      }
    }

    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-l-4 border-green-600">
          <h3 className="text-gray-600 text-sm">Total Users</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {counts.users}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-l-4 border-blue-600">
          <h3 className="text-gray-600 text-sm">Total Plants</h3>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            {counts.plants}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-l-4 border-yellow-600">
          <h3 className="text-gray-600 text-sm">Total Orders</h3>
          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {counts.orders}
          </p>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;