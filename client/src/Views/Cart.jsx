import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../Components/Navbar";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateQty = (id, newQty) => {
    const updated = cart.map(item =>
      item._id === id ? { ...item, qty: newQty } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updated = cart.filter(item => item._id !== id);
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-lg p-5 rounded-lg"
              >
                <Link to={`/plants/slug/${item.slug}`}>
                  <img
                    src={item.image}
                    className="w-24 h-24 rounded-md object-cover cursor-pointer"
                  />
                </Link>

                <div className="flex-1 ml-4">
                  <Link to={`/plants/slug/${item.slug}`}>
                    <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-500 cursor-pointer">
                      {item.name}
                    </h2>
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => item.qty > 1 && updateQty(item._id, item.qty - 1)}
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => item.qty < item.stock && updateQty(item._id, item.qty + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-600 font-semibold ml-4 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;