import { Link } from "react-router";

function PlantCard({ plant }) {
  const discountedPrice = plant.saleDiscount
  ? Number((plant.price - (plant.price * plant.saleDiscount) / 100).toFixed(2))
  : plant.price;


  return (
    <div
      className="
        bg-white rounded-2xl shadow-md 
        hover:shadow-2xl hover:-translate-y-2 
        transition-all duration-300 
        overflow-hidden border border-green-200
      "
    >

      <div className="relative w-full h-56">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {plant.saleBadge && (
          <span
            className="
              absolute top-3 left-3 
              bg-red-600 text-white text-xs font-bold
              px-3 py-1 rounded-full shadow-md
              tracking-wide
            "
          >
            {plant.saleDiscount}% OFF
          </span>
        )}

        <span
          className="
            absolute top-3 right-3 
            bg-green-700 text-white 
            text-xs font-semibold 
            px-3 py-1 rounded-full shadow-md tracking-wide
          "
        >
          {plant.category}
        </span>
      </div>

      <div className="px-4 py-5">

        <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">
          {plant.name}
        </h3>

        <div className="w-10 mx-auto h-[2px] bg-green-500/70 rounded-full mb-3"></div>

        <div className="flex flex-col items-center mt-1">
          {plant.saleDiscount > 0 ? (
            <>
              <p className="text-2xl font-extrabold text-green-700">
                ₹{discountedPrice}
              </p>
              <p className="line-through text-gray-400 text-sm -mt-1">
                ₹{plant.price}
              </p>
            </>
          ) : (
            <p className="text-2xl font-extrabold text-green-700">
              ₹{plant.price}
            </p>
          )}
        </div>

        <Link to={`/plants/slug/${plant.slug}`}>
          <button
            className="
              mt-4 w-full py-2.5 
              bg-gradient-to-r from-green-600 to-green-700 
              text-white font-semibold
              rounded-xl shadow-md
              hover:shadow-lg hover:scale-[1.02]
              transition-all duration-300 cursor-pointer
            "
          >
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}

export default PlantCard;