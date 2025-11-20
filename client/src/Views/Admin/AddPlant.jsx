import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../Components/AdminLayout";

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

      await axios.post(
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Plant added successfully!");

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
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <AdminLayout title="Add New Plant">

      <div className="max-w-3xl bg-white p-10 rounded-xl shadow-lg">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-gray-700 font-medium mb-1">Plant Name</label>
            <input
              type="text"
              value={plant.name}
              onChange={(e) => setPlant({ ...plant, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Ex: Snake Plant"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              value={plant.price}
              onChange={(e) => setPlant({ ...plant, price: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              value={plant.category}
              onChange={(e) => setPlant({ ...plant, category: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
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
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock</label>
            <input
              type="number"
              value={plant.stock}
              onChange={(e) => setPlant({ ...plant, stock: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Ex: 10"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Sale Discount (%)</label>
            <input
              type="number"
              value={plant.saleDiscount}
              onChange={(e) => setPlant({ ...plant, saleDiscount: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Ex: 20"
            />
          </div>

          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              checked={plant.saleBadge}
              onChange={() => setPlant({ ...plant, saleBadge: !plant.saleBadge })}
              className="w-5 h-5"
            />
            <label className="text-gray-700">Show Sale Badge</label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={plant.image}
              onChange={(e) => setPlant({ ...plant, image: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Paste image link here"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={plant.description}
              onChange={(e) => setPlant({ ...plant, description: e.target.value })}
              className="w-full p-3 border rounded-lg h-28 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Write short description..."
            ></textarea>
          </div>
          
        </div>

        {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
        {success && <p className="text-green-600 mt-4 font-medium">{success}</p>}

        <button
          onClick={handleAddPlant}
          className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-green-700 transition"
        >
          Add Plant
        </button>
      </div>
    </AdminLayout>
  );
}

export default AddPlant;