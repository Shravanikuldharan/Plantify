import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first!");

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(res.data.cart?.items || []);
    } catch (error) {
      console.log("Error loading cart:", error);
    }
  };

  const updateQty = async (plantId, qty) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        { plantId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
      alert("Error updating quantity");
    }
  };

  const removeItem = async (plantId) => {
    if (!window.confirm("Remove item?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/remove/${plantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
      alert("Error removing item");
    }
  };

  const getDiscountedPrice = (plant) => {
    if (!plant.saleDiscount) return plant.price;
    return (plant.price - (plant.price * plant.saleDiscount) / 100).toFixed(2);
  };

  const totalPrice = cart.reduce((sum, item) => {
    const discounted = getDiscountedPrice(item.plantId);
    return sum + discounted * item.qty;
  }, 0);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 text-lg p-10">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => {
                const plant = item.plantId;
                const discounted = getDiscountedPrice(plant);

                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-md border border-green-100 hover:shadow-lg transition"
                  >

                    <div className="flex items-center gap-4">

                      <Link to={`/plants/slug/${plant.slug}`}>
                        <img
                          src={plant.image}
                          className="w-24 h-24 rounded-xl object-cover border cursor-pointer"
                        />
                      </Link>

                      <div>
                        <Link to={`/plants/slug/${plant.slug}`}>
                          <h2 className="text-[28px] font-semibold text-green-600 hover:text-green-700 transition cursor-pointer">
                            {plant.name}
                          </h2>
                        </Link>
                        <p className="text-red-600 font-bold text-lg mt-1">₹{discounted}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">

                      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg shadow-inner w-fit">

                        <button
                          onClick={() => item.qty > 1 && updateQty(plant._id, -1)}
                          className="w-7 h-7 flex items-center justify-center transition active:scale-95"
                        >
                          <FaMinus className="text-gray-700 cursor-pointer text-sm" />
                        </button>

                        <span className="text-lg font-semibold text-gray-900 min-w-[20px] text-center">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => item.qty < plant.stock && updateQty(plant._id, +1)}
                          className="w-7 h-7 flex items-center justify-center transition active:scale-95"
                        >
                          <FaPlus className="text-gray-700 cursor-pointer text-sm" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(plant._id)}
                        className="text-red-600 hover:text-red-800 transition mt-3 flex items-center gap-1 text-sm"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit border border-green-100 sticky top-20">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Order Summary
              </h2>

              <div className="text-gray-700 space-y-2">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </p>

                <p className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-700 font-semibold">FREE</span>
                </p>

                <hr className="my-3" />

                <p className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-700">₹{totalPrice}</span>
                </p>
              </div>

              <button
                onClick={() => window.location.href = "/order?type=cart"}

                className="mt-6 w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition flex items-center justify-center gap-2 text-lg font-semibold"
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;