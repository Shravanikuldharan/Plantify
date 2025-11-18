import { useEffect, useState } from "react";
import axios from "axios";

function ManagePlants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchPlants = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/plants`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) setPlants(res.data.plants);
    } catch (err) {
      console.log(err);
      setError("Error fetching plants");
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/plants/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Deleted successfully!");
      fetchPlants();
    } catch (err) {
      console.log(err);
      alert("Delete failed (maybe token missing?)");
    }
  };

  // edit
  const handleEdit = (id) => {
    window.location.href = `/admin/edit-plant/${id}`;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Plants</h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full bg-white shadow">
        <thead className="bg-gray-200 font-semibold">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plants.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">₹{p.price}</td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => window.location.href = `/admin/edit-plant/${p._id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {plants.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">No plants found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagePlants;