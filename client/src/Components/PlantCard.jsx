import { Link } from "react-router";

function PlantCard({ plant }) {

  const discountedPrice = plant.saleDiscount
    ? plant.price - (plant.price * plant.saleDiscount) / 100
    : plant.price;

  return (
    <div className="bg-white shadow rounded-lg p-4 relative hover:shadow-lg transition">

      {plant.saleBadge && (
        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
          SALE {plant.saleDiscount}% OFF
        </span>
      )}

      <img
        src={plant.image}
        alt={plant.name}
        className="w-full h-48 rounded-md object-cover"
      />

      <h3 className="text-xl font-semibold mt-3">{plant.name}</h3>

      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 mt-1 rounded">
        {plant.category}
      </span>

      <div className="mt-3">
        {plant.saleDiscount > 0 ? (
          <>
            <p className="text-lg font-bold text-red-600">₹{discountedPrice}</p>
            <p className="line-through text-gray-500 text-sm">₹{plant.price}</p>
          </>
        ) : (
          <p className="text-lg font-bold">₹{plant.price}</p>
        )}
      </div>

      <Link to={`/plants/slug/${plant.slug}`}>
        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          View Details
        </button>
      </Link>

    </div>
  );
}

export default PlantCard;