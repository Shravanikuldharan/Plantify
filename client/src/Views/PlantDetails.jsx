import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { plantCareConfig, getCategoryTagline } from "../Config/PlantCareConfig.js";
import Navbar from "../Components/Navbar.jsx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function PlantDetails() {
  const { slug } = useParams();
  const [plant, setPlant] = useState(null);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [tagline, setTagline] = useState('');

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
    }
  };

  if (!plant) {
    return <div className="text-center p-10">Loading...</div>;
  }

  const discountedPrice = plant.saleDiscount
    ? plant.price - (plant.price * plant.saleDiscount) / 100
    : plant.price;

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        {
          plantId: plant._id,
          qty: qty
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Added to cart!");
    } catch (err) {
      console.log(err);
      alert("Error adding to cart");
    }
  };

  const toggleWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    try {
      const endpoint = wished ? "/wishlist/remove" : "/wishlist/add";

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        { plantId: plant._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWished(!wished);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Error updating wishlist");
    }
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/place`,
        {
          address: JSON.parse(localStorage.getItem("loggedInUser")).address,
          paymentMethod: "COD",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      window.location.href = "/my-orders";
    } catch (err) {
      console.log(err);
      alert("Order failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative space-y-4">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-[420px] object-cover rounded-xl shadow-xl border"
            />

            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-pink-100 transition flex items-center justify-center"
            >
              {wished ? (
                <AiFillHeart className="text-pink-600 text-2xl" />
              ) : (
                <AiOutlineHeart className="text-pink-600 text-2xl" />
              )}
            </button>
          </div>

          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-3 text-gray-900 tracking-tight">
              {plant.name}
            </h1>

            {plant.saleBadge && plant.saleDiscount > 0 && (
              <span className="inline-block bg-red-600 text-white px-3 py-2 rounded-full text-xs font-bold mb-3">
                {plant.saleDiscount}% OFF
              </span>
            )}

            <span className="inline-block bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium mb-2">
              {plant.category}
            </span>

            <p className="text-gray-500 italic mb-4">
              {tagline}
            </p>

            <p className="text-4xl font-semibold text-green-700 mb-5">
              ₹{discountedPrice}
            </p>

            {plant.saleDiscount > 0 && (
              <p className="line-through text-gray-500">₹{plant.price}</p>
            )}

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {plant.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                -
              </button>
              <span className="text-lg font-semibold">{qty}</span>
              <button
                onClick={() => qty < plant.stock && setQty(qty + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                +
              </button>
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={addToCart}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 hover:scale-[1.02] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  window.location.href = `/order?slug=${plant.slug}&qty=${qty}`
                }
                className="bg-orange-500 text-white px-8 py-3 rounded-lg"
              >
                Buy Now
              </button>

            </div>

            <p className="mt-4 text-gray-500 text-sm">
              In Stock: <span className="font-semibold">{plant.stock}</span>
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white/70 backdrop-blur-md shadow-xl border rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Plant Care Guide
          </h2>

          {plantCareConfig[plant.category]?.map((item, index) => (
            <details
              key={index}
              className="mb-4 border rounded-lg bg-white shadow-md overflow-hidden"
            >
              <summary className="cursor-pointer p-4 flex justify-between items-center text-lg font-semibold">
                <span>{item.icon} {item.title}</span>
              </summary>

              <p className="p-4 text-gray-700 border-t leading-relaxed bg-gray-50">
                {item.description}
              </p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlantDetails;