import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function EditPlant() {
    const { id } = useParams();
    const [plant, setPlant] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
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
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/plants/${id}`,
                plant,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
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
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="w-[450px] bg-white shadow p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Plant</h2>

                <input
                    type="text"
                    value={plant.name}
                    onChange={(e) => setPlant({ ...plant, name: e.target.value })}
                    placeholder="Plant Name"
                    className="w-full p-3 mb-3 border rounded"
                />

                <textarea
                    value={plant.description}
                    onChange={(e) => setPlant({ ...plant, description: e.target.value })}
                    placeholder="Description"
                    className="w-full p-3 mb-3 border rounded h-24"
                />

                <input
                    type="number"
                    value={plant.price}
                    onChange={(e) => setPlant({ ...plant, price: e.target.value })}
                    placeholder="Price"
                    className="w-full p-3 mb-3 border rounded"
                />

                <select
                    value={plant.category}
                    onChange={(e) => setPlant({ ...plant, category: e.target.value })}
                    className="w-full p-3 mb-3 border rounded"
                >
                    <option>Indoor</option>
                    <option>Outdoor</option>
                    <option>Flowering</option>
                    <option>Succulent</option>
                    <option>Air Purifying</option>
                    <option>Herbal</option>
                    <option>Fruit</option>
                    <option>Bonsai</option>
                    <option>Seasonal</option>
                    <option>Climber</option>
                </select>

                <input
                    type="number"
                    value={plant.stock}
                    onChange={(e) => setPlant({ ...plant, stock: e.target.value })}
                    placeholder="Stock"
                    className="w-full p-3 mb-3 border rounded"
                />

                <input
                    type="text"
                    value={plant.image}
                    onChange={(e) => setPlant({ ...plant, image: e.target.value })}
                    placeholder="Image URL"
                    className="w-full p-3 mb-3 border rounded"
                />

                <button
                    onClick={handleUpdate}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                >
                    Update Plant
                </button>
            </div>
        </div>
    );
}

export default EditPlant;