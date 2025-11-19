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
    saleDiscount: 0,
    saleBadge: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddPlant = async () => {
    setError("");
    setSuccess("");

    const { name, description, price, category, stock, image, saleBadge, saleDiscount } = plant;

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
          saleBadge,
          saleDiscount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Plant added successfully!");
      console.log(res.data);

      setPlant({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        saleDiscount: 0,
        saleBadge: false,
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
          className="w-full p-3 mb-3 border rounded"
        />

        <textarea
          placeholder="Description"
          value={plant.description}
          onChange={(e) => setPlant({ ...plant, description: e.target.value })}
          className="w-full p-3 mb-3 border rounded h-24"
        />

        <input
          type="number"
          placeholder="Price"
          value={plant.price}
          onChange={(e) => setPlant({ ...plant, price: e.target.value })}
          className="w-full p-3 mb-3 border rounded"
        />

        <select
          value={plant.category}
          onChange={(e) => setPlant({ ...plant, category: e.target.value })}
          className="w-full p-3 mb-3 border rounded"
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
          className="w-full p-3 mb-3 border rounded"
        />

        {/* Discount */}
        <input
          type="number"
          placeholder="Sale Discount (%)"
          value={plant.saleDiscount}
          onChange={(e) => setPlant({ ...plant, saleDiscount: e.target.value })}
          className="w-full p-3 mb-3 border rounded"
        />

        {/* Show Sale Badge */}
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={plant.saleBadge}
            onChange={() => setPlant({ ...plant, saleBadge: !plant.saleBadge })}
          />
          <label>Show Sale Badge</label>
        </div>

        {/* Image */}
        <input
          type="text"
          placeholder="Image URL"
          value={plant.image}
          onChange={(e) => setPlant({ ...plant, image: e.target.value })}
          className="w-full p-3 mb-3 border rounded"
        />

        {error && <p className="text-red-500 text-sm mb-2">* {error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <button
          onClick={handleAddPlant}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Add Plant
        </button>
      </div>
    </div>
  );
}

export default AddPlant;