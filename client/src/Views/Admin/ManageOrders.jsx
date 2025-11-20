import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../Components/AdminLayout";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/orders`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/order/update/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        timer: 1500,
        showConfirmButton: false
      });

      loadOrders();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <AdminLayout title="Manage Orders">
      <Toaster position="top-right" />

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No orders found</p>
      ) : (
        <div className="overflow-x-auto shadow-lg border rounded-xl bg-white">

          <table className="w-full text-left">

            <thead className="bg-green-600 text-white uppercase text-sm">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Address</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition text-sm"
                >

                  {/* cust */}
                  <td className="p-4">
                    <p className="font-semibold">{order.address?.fullName}</p>
                    <p className="text-gray-600 text-xs">{order.address?.mobile}</p>
                  </td>

                  {/* Address */}
                  <td className="p-4">
                    {order.address?.addressLine},<br />
                    {order.address?.city}
                  </td>

                 {/* items */}
                  <td className="p-4">
                    {order.items.map((item) => {
                      const plant = item.plant; 

                      return (
                        <div key={item._id} className="flex gap-3 mb-3 items-center">
                          
                          <img
                            src={plant?.image || "https://via.placeholder.com/80?text=No+Image"}
                            className="w-12 h-12 rounded object-cover bg-gray-200"
                          />

                          <div>
                            <p className="font-medium">
                              {plant?.name || "Plant Removed"}
                            </p>

                            <p className="text-xs text-gray-500">
                              Qty: {item.qty} | ₹{item.price}
                            </p>
                          </div>

                        </div>
                      );
                    })}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-4">
                    <select
                      className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 outline-none"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

export default ManageOrders;