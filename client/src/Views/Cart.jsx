// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import axios from "axios";
// import Navbar from "../Components/Navbar";

// function Cart() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please login first!");

//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/cart`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCart(res.data.cart?.items || []);
//     } catch (error) {
//       console.log("Error loading cart:", error);
//     }
//   };

//   const updateQty = async (plantId, qty) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/cart/add`,
//         { plantId, qty },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       fetchCart(); 
//     } catch (err) {
//       console.log(err);
//       alert("Error updating quantity");
//     }
//   };

//   const removeItem = async (plantId) => {
//     if (!window.confirm("Remove item?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/cart/remove/${plantId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       fetchCart();
//     } catch (err) {
//       console.log(err);
//       alert("Error removing item");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-6">
//         <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>

//         {cart.length === 0 ? (
//           <div className="text-center text-lg text-gray-500">
//             Your cart is empty.
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {cart.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between bg-white shadow-lg p-5 rounded-lg"
//               >
//                 <Link to={`/plants/slug/${item.plantId.slug}`}>
//                   <img
//                     src={item.plantId.image}
//                     className="w-24 h-24 rounded-md object-cover cursor-pointer"
//                   />
//                 </Link>

//                 <div className="flex-1 ml-4">
//                   <Link to={`/plants/slug/${item.plantId.slug}`}>
//                     <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-500 cursor-pointer">
//                       {item.plantId.name}
//                     </h2>
//                   </Link>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => item.qty > 1 && updateQty(item.plantId._id, -1)}
//                     className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
//                   >
//                     -
//                   </button>

//                   <span>{item.qty}</span>

//                   <button
//                     onClick={() =>
//                       item.qty < item.plantId.stock &&
//                       updateQty(item.plantId._id, +1)
//                     }
//                     className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => removeItem(item.plantId._id)}
//                   className="text-red-600 font-semibold ml-4 hover:text-red-800"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Cart;

import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first!");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(res.data.cart?.items || []);
    } catch (error) {
      console.log("Error loading cart:", error);
    }
  };

  const updateQty = async (plantId, qty) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        { plantId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
      alert("Error updating quantity");
    }
  };

  const removeItem = async (plantId) => {
    if (!window.confirm("Remove item?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/remove/${plantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
      alert("Error removing item");
    }
  };

  // ⭐ APPLY SALE DISCOUNT (same like PlantDetails)
  const getDiscountedPrice = (plant) => {
    if (!plant.saleDiscount || plant.saleDiscount === 0) {
      return plant.price;
    }
    return plant.price - (plant.price * plant.saleDiscount) / 100;
  };

  // ⭐ TOTAL PRICE (with discount)
  const totalPrice = cart.reduce((sum, item) => {
    const plant = item.plantId;
    const discounted = getDiscountedPrice(plant);
    return sum + discounted * item.qty;
  }, 0);

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
          <>
            <div className="space-y-6">
              {cart.map((item) => {
                const plant = item.plantId;
                const discounted = getDiscountedPrice(plant);

                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-white shadow-lg p-5 rounded-lg"
                  >
                    <Link to={`/plants/slug/${plant.slug}`}>
                      <img
                        src={plant.image}
                        className="w-24 h-24 rounded-md object-cover cursor-pointer"
                      />
                    </Link>

                    <div className="flex-1 ml-4">
                      <Link to={`/plants/slug/${plant.slug}`}>
                        <h2 className="text-lg font-semibold text-gray-900 hover:text-green-700 cursor-pointer">
                          {plant.name}
                        </h2>
                      </Link>

                      {/* price section */}
                      {plant.saleDiscount > 0 ? (
                        <div className="text-sm">
                          <p className="text-green-600 font-bold">
                            ₹{discounted}
                          </p>
                          <p className="line-through text-gray-500">
                            ₹{plant.price}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-700 font-bold">₹{plant.price}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          item.qty > 1 && updateQty(plant._id, -1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          item.qty < plant.stock &&
                          updateQty(plant._id, +1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(plant._id)}
                      className="text-red-600 font-semibold ml-4 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ⭐ TOTAL AMOUNT */}
            <div className="mt-10 bg-white shadow-lg p-5 rounded-lg text-right">
              <h2 className="text-2xl font-bold text-gray-700">
                Total:{" "}
                <span className="text-green-600">₹{totalPrice}</span>
              </h2>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
