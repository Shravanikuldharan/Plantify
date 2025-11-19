import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { plantCareConfig, getCategoryTagline } from "../Config/PlantCareConfig.js";
import Navbar from "../Components/Navbar.jsx";

function PlantDetails() {
  const { slug } = useParams(); 
  const [plant, setPlant] = useState(null);
  const [qty, setQty] = useState(1);
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

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item._id === plant._id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        _id: plant._id,
        slug: plant.slug,  
        name: plant.name,
        image: plant.image,
        price: discountedPrice,
        originalPrice: plant.price,
        saleDiscount: plant.saleDiscount,
        qty,
        stock: plant.stock
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-[420px] object-cover rounded-xl shadow-xl border"
            />
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

              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-orange-600 hover:scale-[1.02] transition">
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