import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import plantCareConfig from "../Config/PlantCareConfig.js";

function PlantDetails() {
  const { slug } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetchPlant();
  }, []);

  const fetchPlant = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/plants/slug/${slug}`
      );

      setPlant(res.data.plant);
    } catch (error) {
      console.log("Error fetching plant:", error);
    }
  };

  if (!plant) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
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

        <span className="inline-block bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium mb-4">
          {plant.category}
        </span>

        <p className="text-4xl font-semibold text-green-700 mb-5">
          ₹{plant.price}
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          {plant.description}
        </p>

        <div className="flex gap-4 mt-2">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 hover:scale-[1.02] transition">
            Add to Cart
          </button>

          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-orange-600 hover:scale-[1.02] transition">
            Buy Now
          </button>
        </div>

        <p className="mt-4 text-gray-500 text-sm">
          🌿 In Stock: <span className="font-semibold">{plant.stock}</span>
        </p>
      </div>
    </div>

    <div className="mt-16 bg-white/70 backdrop-blur-md shadow-xl border rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🌱 Plant Care Guide
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
);
}

export default PlantDetails;