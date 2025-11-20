import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import Footer from "../Components/Footer";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import Features from "../Components/Features";
import ReviewsSection from "../Components/ReviewsSection";
import StatsSection from "../Components/StatsSection ";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100/40">
      <Navbar />

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

      <StatsSection />
      <Features />
      <ReviewsSection />
      <Footer />
    </div>
  );
}

export default Home;
