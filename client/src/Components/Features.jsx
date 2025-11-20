import React from "react";
import { FaLeaf } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { GiWateringCan, GiPlantSeed } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

const featuresData = [
  {
    icon: <FaLeaf size={24} className="text-white" />,
    title: "Fresh & Healthy Plants",
    description: "Handpicked, well-nurtured plants grown with natural care.",
    gradient: "from-green-500 to-green-700",
  },
  {
    icon: <TbTruckDelivery size={24} className="text-white" />,
    title: "Fast Eco-Friendly Delivery",
    description: "Safe and sustainable packaging that protects your plants.",
    gradient: "from-emerald-400 to-green-600",
  },
  {
    icon: <GiWateringCan size={24} className="text-white" />,
    title: "Easy Care Guides",
    description: "Simple instructions on watering, sunlight and maintenance.",
    gradient: "from-lime-400 to-green-500",
  },
  {
    icon: <GiPlantSeed size={24} className="text-white" />,
    title: "Huge Plant Variety",
    description: "Choose from 100+ indoor, outdoor and flowering plants.",
    gradient: "from-yellow-400 to-lime-500",
  },
  {
    icon: <MdHealthAndSafety size={24} className="text-white" />,
    title: "Pest-Free Guarantee",
    description: "Every plant is checked for quality and health before packing.",
    gradient: "from-teal-400 to-green-600",
  },
  {
    icon: <RiCustomerService2Fill size={24} className="text-white" />,
    title: "Plant Support Anytime",
    description: "Expert help to guide you in choosing and caring for plants.",
    gradient: "from-green-400 to-emerald-500",
  },
];

const Features = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100/40 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto text-center mb-14 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600 mb-3">
          Why Choose Our <span className="text-green-600">Plant Nursery</span>?
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Quality plants, expert guidance, and green happiness delivered to you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="
              relative bg-white p-6 sm:p-8 rounded-3xl shadow-lg 
              hover:shadow-2xl transition transform 
              hover:-translate-y-2 duration-500 text-center overflow-hidden
            "
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 
                flex items-center justify-center 
                bg-gradient-to-br ${feature.gradient} 
                transform hover:scale-105 transition duration-500`}
            >
              {feature.icon}
            </div>

            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-500">
              {feature.description}
            </p>

            <div className="absolute -top-8 -right-8 w-20 h-20 sm:w-28 sm:h-28 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;