import { useEffect, useState } from "react";
import axios from "axios";
import PlantCard from "../Components/PlantCard";
import Navbar from "../Components/Navbar";

function AllPlants() {
  const [plants, setPlants] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/plants`);
      if (res.data.success) {
        setPlants(res.data.plants);
      }
    } catch (err) {
      console.log("Error fetching plants:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Our Plants</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plants.map((p) => (
          <PlantCard key={p._id} plant={p} />
        ))}
      </div>
    </div>
    </>
  );
}

export default AllPlants;
