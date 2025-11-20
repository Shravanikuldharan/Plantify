import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../Components/AdminLayout";

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

      setOrders(res.data.orders);
    } catch (err) {
      console.log("Error:", err);
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

      loadOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  return (
    <AdminLayout title="Manage Orders">  

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No orders found
        </p>
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
                    <p className="font-semibold">{order.address.fullName}</p>
                    <p className="text-gray-600 text-xs">{order.address.mobile}</p>
                  </td>

                  {/* address */}
                  <td className="p-4">
                    {order.address.addressLine},<br />
                    {order.address.city}
                  </td>

                  {/* items */}
                  <td className="p-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex gap-3 mb-3 items-center">
                        <img
                          src={item.plant.image}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.plant.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.qty} | ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>

                  {/* total */}
                  <td className="p-4 font-semibold text-green-600">
                    ₹{order.totalAmount}
                  </td>

                  {/* date */}
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* dropdoen status */}
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