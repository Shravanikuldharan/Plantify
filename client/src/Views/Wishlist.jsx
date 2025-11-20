import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import { FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function Wishlist() {
  const [items, setItems] = useState([]);

  const loadWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(res.data.wishlist);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load wishlist!");
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist/remove`,
        { plantId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Removed from wishlist!");
      loadWishlist();
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove wishlist!");
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 p-10">
        <Toaster position="top-center" reverseOrder={false} />

        {items.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((w) => (
              <div
                key={w._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-green-100 transition overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={w.plant.image}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />

                  <button
                    onClick={() => removeItem(w.plant._id)}
                    className="absolute top-3 right-3 bg-white shadow-md p-2 rounded-full text-red-600 hover:bg-red-100 transition cursor-pointer"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {w.plant.name}
                  </h3>

                  <p className="text-green-700 font-bold text-lg mt-1 text-center">
                    ₹{w.plant.price}
                  </p>

                  <div className="flex justify-center gap-4 mt-5">
                    <Link to={`/plants/slug/${w.plant.slug}`}>
                      <button className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition cursor-pointer">
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => removeItem(w.plant._id)}
                      className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;