import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";

function Wishlist() {
  const [items, setItems] = useState([]);

  const loadWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(res.data.wishlist);
    } catch (err) {
      console.log(err);
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

      loadWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">My Wishlist</h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((w) => (
              <div className="bg-white shadow rounded-lg p-4" key={w._id}>
                <img
                  src={w.plant.image}
                  className="w-full h-40 object-cover rounded"
                />

                <h3 className="text-lg font-semibold mt-3">{w.plant.name}</h3>

                <p className="text-green-600 font-bold">₹{w.plant.price}</p>

                <div className="flex justify-between mt-3">
                  <Link to={`/plants/slug/${w.plant.slug}`}>
                    <button className="px-3 py-1 bg-green-600 text-white rounded">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => removeItem(w.plant._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Remove
                  </button>
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