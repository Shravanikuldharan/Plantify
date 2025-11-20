import { useEffect, useState } from "react";
import axios from "axios";
import PlantCard from "../Components/PlantCard";
import Navbar from "../Components/Navbar";
import { FiSearch } from "react-icons/fi";
import Footer from "../Components/Footer";

function AllPlants() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "Indoor",
    "Outdoor",
    "Flowering",
    "Succulent",
    "Air Purifying",
    "Herbal",
    "Fruit",
    "Bonsai",
    "Seasonal",
    "Climber",
  ];

  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/plants`);
      if (res.data.success) {
        const plantList = res.data.plants;

        setPlants(plantList);
        setFilteredPlants(plantList);
      }
    } catch (err) {
      console.log("Error fetching plants:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterPlants();
  }, [search, activeCategory]);

  const filterPlants = () => {
    let data = [...plants];

    if (activeCategory !== "All") {
      data = data.filter((p) => p.category === activeCategory);
    }

    if (search.trim() !== "") {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPlants(data);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100/40 p-6">

        <div className="max-w-xl mx-auto mb-10">
          <div className="
            bg-white shadow-lg rounded-2xl flex items-center px-4 py-2 
            border border-green-200 focus-within:ring-2 
            focus-within:ring-green-500 transition-all
          ">

            <FiSearch className="text-green-600 text-xl mr-3" />

            <input
              type="text"
              placeholder="Search plants by name..."
              className="
                w-full px-3 py-2 bg-transparent outline-none
                text-gray-700 placeholder-gray-400
              "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">

          <button
            onClick={() => setActiveCategory("All")}
            className={`
                px-4 py-2 rounded-full text-md font-semibold 
                transition-all duration-300 shadow-sm cursor-pointer
                ${activeCategory === "All"
                ? "bg-green-600 text-white shadow-md cursor-pointer"
                : "bg-white text-green-700 border border-green-300 hover:bg-green-50 cursor-pointer"
              }
          `}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                  px-4 py-2 rounded-full text-md font-semibold 
                  transition-all duration-300 shadow-sm cursor-pointer
                  ${activeCategory === cat
                  ? "bg-green-600 text-white shadow-md cursor-pointer"
                  : "bg-white text-green-700 border border-green-300 hover:bg-green-50 cursor-pointer"
                }
             `}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((p) => (
              <PlantCard key={p._id} plant={p} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full text-lg">
              🌱 No plants found for your search.
            </p>
          )}
        </div>
      </div>
    <Footer />
    </>
  );
}

export default AllPlants;