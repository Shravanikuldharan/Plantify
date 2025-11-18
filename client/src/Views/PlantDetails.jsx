import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

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
    <div className="max-w-4xl mx-auto p-6">
      {/* Image */}
      <img
        src={plant.image}
        alt={plant.name}
        className="w-full h-80 object-cover rounded-lg shadow-md"
      />

      {/* Name */}
      <h1 className="text-3xl font-bold mt-5">{plant.name}</h1>

      {/* Category */}
      <span className="mt-3 inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full">
        {plant.category}
      </span>

      {/* Price */}
      <p className="text-3xl font-bold text-green-700 mt-4">₹{plant.price}</p>

      {/* Description */}
      <p className="text-gray-700 mt-4 leading-relaxed">{plant.description}</p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Add to Cart
        </button>

        <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default PlantDetails;