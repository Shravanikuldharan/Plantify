function PlantCard({ plant }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
      
      <img
        src={plant.image}
        alt={plant.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      <h3 className="text-xl font-semibold">{plant.name}</h3>

      <span className="inline-block mt-2 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
        {plant.category}
      </span>

      <p className="text-lg font-bold mt-3">₹{plant.price}</p>

      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {plant.description}
      </p>

      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        View Details
      </button>
    </div>
  );
}

export default PlantCard;
