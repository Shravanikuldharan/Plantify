import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { plantCareConfig, getCategoryTagline } from "../Config/PlantCareConfig.js";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaMinus, FaPlus, FaTruck } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function PlantDetails() {
  const { slug } = useParams();
  const [plant, setPlant] = useState(null);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    fetchPlant();
  }, []);

  const fetchPlant = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/plants/slug/${slug}`
      );

      setPlant(res.data.plant);
      setTagline(getCategoryTagline(res.data.plant.category));

      const token = localStorage.getItem("token");
      if (token) {
        const wishRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/wishlist`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const already = wishRes.data.wishlist.some(
          (item) => item.plant._id === res.data.plant._id
        );
        setWished(already);
      }
    } catch (error) {
      console.log("Error fetching plant:", error);
      toast.error("Failed to load plant details!");
    }
  };

  if (!plant) {
    return (
      <div className="text-center p-10">
        <Toaster />
        Loading...
      </div>
    );
  }

  const discountedPrice = plant.saleDiscount
    ? (plant.price - (plant.price * plant.saleDiscount) / 100).toFixed(2)
    : plant.price;

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first!");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        { plantId: plant._id, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Added to cart!");
    } catch (err) {
      console.log(err);
      toast.error("Error adding to cart");
    }
  };

  const toggleWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first!");

    try {
      const endpoint = wished ? "/wishlist/remove" : "/wishlist/add";

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        { plantId: plant._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWished(!wished);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error("Error updating wishlist");
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first!");

    window.location.href = `/order?slug=${plant.slug}&qty=${qty}`;
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="flex flex-col gap-6">
            <div className="relative">
              <span className="absolute top-4 left-4 bg-green-100 text-green-700 px-4 py-2 rounded-full shadow text-sm font-semibold z-20">
                {plant.category}
              </span>

              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-[420px] object-cover rounded-xl shadow-xl border"
              />

              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 bg-white cursor-pointer p-3 rounded-full shadow-md hover:bg-pink-100 transition"
              >
                {wished ? (
                  <AiFillHeart className="text-pink-600 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-pink-600 text-2xl" />
                )}
              </button>
            </div>

            <div className="bg-white border border-green-200 rounded-2xl shadow p-4 w-full">
              <h2 className="text-xl font-bold mb-4 text-green-900 flex items-center gap-2">
                🌿 Plant Care Guide
              </h2>

              <div className="space-y-3">
                {plantCareConfig[plant.category]?.map((item, index) => (
                  <div key={index} className="border rounded-lg shadow-sm overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition"
                      onClick={(e) => {
                        const content = e.currentTarget.nextElementSibling;
                        content.style.maxHeight =
                          content.style.maxHeight ? null : content.scrollHeight + "px";
                      }}
                    >
                      <span className="flex items-center gap-3 text-[16px]">
                        <span className="text-xl">{item.icon}</span>
                        {item.title}
                      </span>
                      <span className="transition-transform duration-300 text-gray-500">
                        ▼
                      </span>
                    </button>

                    <div className="max-h-0 overflow-hidden transition-all duration-300 border-t bg-gray-50">
                      <p className="p-4 text-gray-700 text-[15px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col pr-6">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{plant.name}</h1>
            <p className="text-gray-500 italic mb-4">{tagline}</p>

            <div className="flex items-center gap-4 mb-2">
              {plant.saleDiscount > 0 && (
                <span className="bg-[#CC0C39] text-white px-2 py-[2px] rounded-md text-md font-semibold">
                  Limited time deal
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-1">
              {plant.saleDiscount > 0 && (
                <span className="text-red-600 font-bold text-xl">
                  -{plant.saleDiscount}%
                </span>
              )}
              <span className="text-4xl font-bold text-green-700">
                ₹{discountedPrice}
              </span>
            </div>

            {plant.saleDiscount > 0 && (
              <p className="text-gray-600 text-lg mb-2">
                M.R.P: <span className="line-through">₹{plant.price}</span>
              </p>
            )}

            <p className="text-gray-500 text-sm mb-4">Inclusive of all taxes</p>

            <p className="text-gray-700 text-[15px] leading-relaxed mb-6 w-[90%]">
              {plant.description}
            </p>

            <div className="mb-4">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg shadow-inner w-fit">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="w-7 h-7 flex items-center justify-center transition active:scale-95"
                >
                  <FaMinus className="text-gray-700 cursor-pointer text-sm" />
                </button>

                <span className="text-base font-semibold text-gray-900 min-w-[20px] text-center">
                  {qty}
                </span>

                <button
                  onClick={() => qty < plant.stock && setQty(qty + 1)}
                  className="w-7 h-7 flex items-center justify-center transition active:scale-95"
                >
                  <FaPlus className="text-gray-700 cursor-pointer text-sm" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-2 mb-4">
              <button
                onClick={addToCart}
                className="cursor-pointer bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="cursor-pointer bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-orange-600 transition"
              >
                Buy Now
              </button>
            </div>

            <div className="bg-green-100 border-l-4 border-green-600 rounded-xl p-4 mt-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaTruck className="text-green-700 text-xl" />
                Delivery Details
              </h3>

              <ul className="text-md text-gray-700 space-y-2 leading-relaxed">
                <li>• Delivery in <span className="font-semibold">3–5 business days</span></li>
                <li>• Free replacement if the plant is damaged</li>
                <li>• Eco-friendly packaging and safe delivery</li>
                <li>• Cash on Delivery available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PlantDetails;
