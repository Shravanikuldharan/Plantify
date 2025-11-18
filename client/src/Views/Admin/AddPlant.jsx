import { useState } from "react";
import axios from "axios";

function AddPlant() {
  const [plant, setPlant] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddPlant = async () => {
    setError("");
    setSuccess("");

    const { name, description, price, category, stock, image } = plant;

    // basic validation
    if (!name || !description || !price || !category || !image) {
      setError("All fields except stock are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/plants/add`,
        {
          name,
          description,
          price,
          category,
          stock,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Plant added successfully!");
      console.log(res.data);

      // Clear form
      setPlant({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[400px] bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Add New Plant</h2>

        <input
          type="text"
          placeholder="Plant Name"
          value={plant.name}
          onChange={(e) => setPlant({ ...plant, name: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          placeholder="Description"
          value={plant.description}
          onChange={(e) => setPlant({ ...plant, description: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none h-24 focus:ring-2 focus:ring-green-500"
        />

        <input
          type="number"
          placeholder="Price"
          value={plant.price}
          onChange={(e) => setPlant({ ...plant, price: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={plant.category}
          onChange={(e) => setPlant({ ...plant, category: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Category</option>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Flowering">Flowering</option>
          <option value="Succulent">Succulent</option>
          <option value="Air Purifying">Air Purifying</option>
          <option value="Herbal">Herbal</option>
          <option value="Fruit">Fruit</option>
          <option value="Bonsai">Bonsai</option>
          <option value="Seasonal">Seasonal</option>
          <option value="Climber">Climber</option>
        </select>

        <input
          type="number"
          placeholder="Stock"
          value={plant.stock}
          onChange={(e) => setPlant({ ...plant, stock: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL"
          value={plant.image}
          onChange={(e) => setPlant({ ...plant, image: e.target.value })}
          className="w-full p-3 mb-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-2">* {error}</p>}

        {/* Success */}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <button
          onClick={handleAddPlant}
          className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
        >
          Add Plant
        </button>
      </div>
    </div>
  );
}

export default AddPlant;