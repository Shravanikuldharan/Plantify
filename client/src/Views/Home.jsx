import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import Footer from "../Components/Footer";

// 👉 Your Plant Nursery Hero Images
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import Features from "../Components/Features";
import ReviewsSection from "../Components/ReviewsSection";

function Home() {
  const images = [hero1, hero2, hero3, hero4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* 🌿 HERO SECTION (Sliding Image Banner) */}
      <div className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4 z-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
            Bring Nature Closer to You 🌿
          </h1>

          <p className="text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl mb-4 md:mb-6">
            Healthy indoor & outdoor plants delivered fresh to your home.
          </p>

          <Link to="/plants">
            <button className="bg-green-600 cursor-pointer text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base">
              Shop Plants
            </button>
          </Link>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-5 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-30">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>

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

      {/* FEATURED PLANTS
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
      </section> */}
      
      <Features />
      <ReviewsSection />

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
