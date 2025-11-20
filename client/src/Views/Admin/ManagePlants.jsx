import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../Components/AdminLayout";

function ManagePlants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchPlants = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/plants`);
      if (res.data.success) setPlants(res.data.plants);
    } catch (err) {
      console.log(err);
      setError("Error fetching plants");
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (id) => {
  // ➤ Step 1: SweetAlert confirmation box
  const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, Delete it",
  });

  if (!confirmDelete.isConfirmed) return;

  // ➤ Step 2: Delete API call
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/plants/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Plant deleted successfully!");
    fetchPlants();

  } catch (err) {
    console.log(err);
    toast.error("Failed to delete plant!");
  }
};

  return (
    <AdminLayout title="Manage Plants">

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto shadow-lg border rounded-xl bg-white">

        <table className="w-full text-left">

          <thead className="bg-green-600 text-white uppercase text-sm">
            <tr>
              <th className="p-4">Plant</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Sale (%)</th>
              <th className="p-4">Sale Badge</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {plants.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50 transition text-sm"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={p.image}
                    className="w-12 h-12 rounded object-cover border"
                  />
                  <span className="font-semibold">{p.name}</span>
                </td>

                <td className="p-4">{p.category}</td>

                <td className="p-4 font-semibold">₹{p.price}</td>

                <td className="p-4">{p.saleDiscount || 0}%</td>

                <td className="p-4">
                  {p.saleBadge ? (
                    <span className="text-green-600 font-bold">✔ Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => (window.location.href = `/admin/edit-plant/${p._id}`)}
                    className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-4 cursor-pointer py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {plants.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No plants found.
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </AdminLayout>
  );
}

export default ManagePlants;