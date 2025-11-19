import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Bring Nature <br /> 
            <span className="text-green-600">Closer to You 🌿</span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Discover beautiful indoor & outdoor plants that make your home 
            greener and your life healthier.
          </p>

          <Link to="/plants">
            <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg text-lg shadow-md hover:bg-green-700 transition">
              Shop Plants
            </button>
          </Link>
        </div>

        <div className="flex justify-center">
          <img
            src="https://i.ibb.co/5nhyM20/plant-hero.png"
            className="w-[350px] md:w-[450px] drop-shadow-xl rounded-xl"
          />
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

          {[
            "Indoor",
            "Outdoor",
            "Succulent",
            "Flowering",
            "Air Purifying",
            "Herbal",
            "Fruit",
            "Bonsai",
          ].map((cat) => (
            <Link key={cat} to="/plants">
              <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center">
                <p className="text-lg font-semibold text-gray-700">{cat}</p>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* FEATURED PLANTS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Featured Plants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
            >
              <img
                src="https://i.ibb.co/YQpKQJv/plant-pot.jpg"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold">Beautiful Plant</h3>
              <p className="text-green-600 text-lg font-bold mt-2">₹499</p>

              <Link to="/plants">
                <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-green-600 text-white py-16 text-center mt-16">
        <h2 className="text-4xl font-bold mb-4">Fresh Plants Delivered 🌱</h2>
        <p className="text-lg opacity-90 mb-6">
          We deliver healthy, beautiful plants right to your doorstep.
        </p>

        <Link to="/plants">
          <button className="bg-white text-green-700 px-10 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition">
            Explore Now
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Home;