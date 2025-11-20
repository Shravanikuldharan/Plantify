import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import AdminLayout from "../../Components/AdminLayout";

function EditPlant() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchPlant = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/plants/${id}`);
      setPlant(res.data.plant);
      setLoading(false);
    } catch (err) {
      console.error("Error loading plant:", err);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/plants/${id}`,
        plant,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Plant updated successfully!");
      window.location.href = "/admin/manage-plants";
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update plant");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <AdminLayout title="Edit Plant">

      <div className="max-w-3xl bg-white p-10 rounded-xl shadow-lg">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-gray-700 font-medium mb-1">Plant Name</label>
            <input
              type="text"
              value={plant.name}
              onChange={(e) => setPlant({ ...plant, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              value={plant.price}
              onChange={(e) => setPlant({ ...plant, price: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              value={plant.category}
              onChange={(e) => setPlant({ ...plant, category: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
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
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Sale Discount (%)</label>
            <input
              type="number"
              value={plant.saleDiscount}
              onChange={(e) => setPlant({ ...plant, saleDiscount: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={plant.description}
              onChange={(e) => setPlant({ ...plant, description: e.target.value })}
              className="w-full p-3 border rounded-lg h-28 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700 transition"
        >
          Update Plant
        </button>
      </div>

    </AdminLayout>
  );
}

export default EditPlant;