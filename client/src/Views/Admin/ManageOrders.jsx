import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/orders`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setOrders(res.data.orders);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/order/update/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      loadOrders(); // fetch updated data
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin – Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No orders found</p>
      ) : (
        <div className="overflow-x-auto shadow-lg border rounded-lg">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
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
                <tr key={order._id} className="border-b hover:bg-gray-50 text-sm">

                  {/* cust */}
                  <td className="p-4">
                    <p className="font-semibold">{order.address.fullName}</p>
                    <p className="text-gray-600 text-xs">{order.address.mobile}</p>
                  </td>

                  <td className="p-4 text-semibold">
                    {order.address.addressLine},<br />
                    {order.address.city}
                  </td>

                  {/* plant */}
                  <td className="p-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex gap-2 mb-2">
                        <img
                          src={item.plant.image}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p>{item.plant.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.qty} | ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>

                  {/* total amt */}
                  <td className="p-4 font-semibold text-green-600">
                    ₹{order.totalAmount}
                  </td>

                  {/* date */}
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* stats update */}
                  <td className="p-4">
                    <select
                      className="border px-3 py-1 rounded"
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
    </div>
  );
}

export default ManageOrders;