import React from "react";
import aboutImage from "../assets/about.png";
import visionIcon from "../assets/vision.png";
import missionIcon from "../assets/goal.png";

import team1 from "../assets/team1.jpg";
import team2 from "../assets/review4.jpg";
import team3 from "../assets/review7.png";
import team4 from "../assets/review1.jpeg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const About = () => {
  const teamMembers = [
    { name: "Shravani K", role: "Founder & Plant Expert", img: team1 },
    { name: "Aarav Patel", role: "Nursery Manager", img: team2 },
    { name: "Nil Verma", role: "Customer Support Lead", img: team3 },
    { name: "Aditi Raykar", role: "Logistics & Delivery Head", img: team4 },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100/40">
      <Navbar />
      <section className="flex flex-col md:flex-row items-center justify-between w-full py-8 gap-8 md:gap-10 bg-gradient-to-br from-green-50 to-green-100/40 px-4 sm:px-10 md:px-16">
        <div className="w-full md:w-1/2 space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700">
            About Plantify 🌿
          </h1>

          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            Plantify Nursery is built with love for nature. We aim to make homes
            greener, fresher, and more peaceful by bringing healthy plants directly
            from our nursery to your doorstep.
          </p>

          <button className="bg-green-600 cursor-pointer text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img src={aboutImage} className="w-full sm:w-4/5 md:w-[85%]" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-20 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center text-green-700 mb-12 sm:mb-16">
          Our Vision & Mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 w-full px-4 sm:px-10 md:px-16">

          <div className="
      rounded-3xl overflow-hidden 
      bg-gradient-to-br from-green-50 to-green-200
      shadow-lg p-8 sm:p-10 
      border border-green-300/40
      hover:shadow-2xl hover:-translate-y-2
      transition-all duration-500
    ">
            <div className="flex items-center mb-6">
              <div className="
          w-16 h-16 mr-4 rounded-2xl
          bg-white shadow-md flex items-center justify-center
          border border-green-400/30
        ">
                <img src={visionIcon} className="w-10 h-10 object-contain" />
              </div>

              <h3 className="text-2xl font-semibold text-green-700">
                Our Vision
              </h3>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              To make every home greener and healthier by offering a wide variety of
              plants with expert guidance for beginners and plant lovers.
            </p>
          </div>

          <div className="
      rounded-3xl overflow-hidden 
      bg-gradient-to-br from-green-100 to-green-300
      shadow-lg p-8 sm:p-10
      border border-green-400/40
      hover:shadow-2xl hover:-translate-y-2
      transition-all duration-500
    ">
            <div className="flex items-center mb-6">
              <div className="
          w-16 h-16 mr-4 rounded-2xl
          bg-white shadow-md flex items-center justify-center
          border border-green-500/40
        ">
                <img src={missionIcon} className="w-10 h-10 object-contain" />
              </div>

              <h3 className="text-2xl font-semibold text-green-700">
                Our Mission
              </h3>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              To deliver healthy, pest-free plants with eco-friendly packaging,
              detailed care instructions, and on-time doorstep delivery.
            </p>
          </div>

        </div>
      </section>

      <section className="py-12 sm:py-20 text-center bg-gradient-to-br from-green-50 to-green-100/40 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-green-700">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full px-4 sm:px-10 md:px-16">
          {teamMembers.map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="relative group w-36 sm:w-50 h-36 sm:h-50 rounded-full overflow-hidden">
                <img
                  src={member.img}
                  className="w-full h-full object-cover rounded-full shadow-lg transition-all duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 rounded-full bg-green-700/70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-semibold sm:text-lg">{member.name}</h3>
                  <p className="text-white text-xs sm:text-sm opacity-90">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;