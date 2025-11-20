import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/order/my-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const activeOrders = res.data.orders.filter(
        (order) => order.status !== "Cancelled"
      );

      setOrders(activeOrders);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  const cancelOrderFunction = async (orderId) => {
    const sure = confirm("Cancel this order?");
    if (!sure) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/order/cancel/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(prev => prev.filter(order => order._id !== orderId)); //remove after cancel
      alert("Order cancelled!");

    } catch (err) {
      console.log(err);
      alert("Failed to cancel");
    }
  };

  if (loading) return <p className="text-center p-8 text-lg">Loading orders...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 p-6">
        {orders.length === 0 && (
          <p className="text-center text-gray-600 text-xl">No orders yet</p>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md border rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-4">

                <h2 className="font-semibold text-xl">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </h2>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-bold ${order.status === "Delivered"
                      ? "bg-green-200 text-green-700"
                      : order.status === "Shipped"
                        ? "bg-blue-200 text-blue-700"
                        : order.status === "Processing"
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.plant.image}
                      className="w-20 h-20 rounded-lg object-cover shadow"
                    />

                    <div>
                      <p className="font-semibold text-lg">{item.plant.name}</p>
                      <p>Quantity: {item.qty}</p>
                      <p className="text-green-700 font-semibold">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg">
                {order.status === "Pending" && (
                  <button
                    onClick={() => cancelOrderFunction(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel Order
                  </button>
                )}

                <p className="font-semibold">
                  Ordered On:{" "}
                  <span className="text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <p className="font-bold text-orange-600">
                  Total: ₹{order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyOrders;