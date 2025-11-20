import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function Order() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const slug = query.get("slug");
  const qtyParam = query.get("qty");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login first!");

      if (slug) {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/plants/slug/${slug}`
        );

        const plant = res.data.plant;
        const finalPrice =
          plant.saleDiscount > 0
            ? (plant.price - (plant.price * plant.saleDiscount) / 100).toFixed(2)
            : plant.price;

        setItems([
          {
            plantId: plant._id,
            name: plant.name,
            image: plant.image,
            qty: qtyParam ? Number(qtyParam) : 1,
            price: finalPrice,
          },
        ]);

        setLoading(false);
        return;
      }

      if (query.get("type") === "cart") {
        const cartRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const formatted = cartRes.data.cart.items.map(item => {
          const p = item.plantId;
          const price =
            p.saleDiscount > 0
              ? p.price - (p.price * p.saleDiscount) / 100
              : p.price;

          return {
            plantId: p._id,
            name: p.name,
            image: p.image,
            qty: item.qty,
            price,
          };
        });

        setItems(formatted);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load order items!");
    }
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/place`,
        {
          items,
          totalAmount,
          paymentMethod,
          address: {
            fullName,
            mobile,
            addressLine: address,
            city,
            state,
            zip,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order placed successfully!");

      setTimeout(() => {
        window.location.href = "/my-orders";
      }, 1200);
    } catch (err) {
      console.log(err);
      toast.error("Order failed!");
    }
  };

  if (loading)
    return <h2 className="text-center p-6 text-xl">Loading Order...</h2>;

  return (
    <>
      <Navbar />

      <Toaster position="top-center" />

      <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl text-orange-600 font-bold mb-6">Shipping Information</h2>

            <div className="space-y-4">

              <div>
                <label className="font-semibold">Full Name :</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full mt-1 border p-3 rounded-lg"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="font-semibold">Mobile Number :</label>
                <input
                  type="number"
                  placeholder="1234567890"
                  className="w-full mt-1 border p-3 rounded-lg"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div>
                <label className="font-semibold">Address :</label>
                <textarea
                  className="w-full mt-1 border p-3 rounded-lg"
                  rows="3"
                  placeholder="Your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold">City :</label>
                  <input
                    className="w-full mt-1 border p-3 rounded-lg"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your city"
                  />
                </div>

                <div>
                  <label className="font-semibold">State :</label>
                  <input
                    className="w-full mt-1 border p-3 rounded-lg"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Your state"
                  />
                </div>

                <div>
                  <label className="font-semibold">Zip Code :</label>
                  <input
                    type="number"
                    className="w-full mt-1 border p-3 rounded-lg"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="000000"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">Payment Mode :</label>
                <select
                  className="w-full mt-1 border p-3 rounded-lg"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Online Payment">Online Payment</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl text-orange-600 font-bold mb-6">Order Summary</h2>

            {items.map((item) => (
              <div key={item.plantId} className="flex gap-4 items-center mb-6">
                <img
                  src={item.image}
                  className="w-24 h-24 rounded-lg object-cover shadow"
                />

                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-green-700 font-bold">₹{item.price}</p>
                  <p>Qty: {item.qty}</p>
                </div>
              </div>
            ))}

            <hr className="my-4" />

            <h3 className="text-xl font-bold text-orange-600">
              Total: ₹{totalAmount}
            </h3>

            <button
              onClick={placeOrder}
              className="mt-6 w-full bg-orange-600 text-white py-3 rounded-lg text-md hover:bg-orange-700 transition"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;