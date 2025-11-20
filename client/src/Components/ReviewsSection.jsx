import React, { useEffect, useState, useRef } from "react";
import REVIEWS_CONFIG from "../Config/ReviewsConfig";
import ReviewCard from "./ReviewCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ReviewsSection() {
  const cardsToShow = 3;

  // infinite smooth looping
  const reviews = [...REVIEWS_CONFIG, ...REVIEWS_CONFIG];

  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  const itemWidth = 340; 
  const gap = 30; 
  const containerHeight = 420; 

  useEffect(() => {
    const timer = setInterval(() => goNext(), 6000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => setIndex((prev) => prev + 1);
  const goPrev = () => setIndex((prev) => prev - 1);

  useEffect(() => {
    const total = reviews.length;
    const slider = sliderRef.current;

    if (index === total - cardsToShow) {
      setTimeout(() => {
        slider.style.transition = "none";
        slider.style.transform = `translateX(0px)`;

        requestAnimationFrame(() => {
          setIndex(0);
          slider.style.transition = "transform 0.4s linear";
        });
      }, 400);
    }

    if (index === -1) {
      slider.style.transition = "none";
      const lastPos = (total - cardsToShow) * (itemWidth + gap);
      slider.style.transform = `translateX(-${lastPos}px)`;

      requestAnimationFrame(() => {
        setIndex(total - cardsToShow);
        slider.style.transition = "transform 0.4s linear";
      });
    }
  }, [index]);

  const translateX = -(index * (itemWidth + gap));

  return (
    <div className="py-20 w-full bg-white relative">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-12">
          What <span className="text-green-600">Plant Lovers</span> Say 🌿
        </h2>

        <button
          onClick={goPrev}
          className="
            absolute left-12 top-[50%] -translate-y-1/2 -translate-x-1/2
            p-3 rounded-full bg-green-100 hover:bg-green-200 
            text-green-700 shadow-sm transition z-20
          "
        >
          <FaArrowLeft size={20} />
        </button>

        <button
          onClick={goNext}
          className="
            absolute right-12 top-[50%] -translate-y-1/2 translate-x-1/2
            p-3 rounded-full bg-green-100 hover:bg-green-200
            text-green-700 shadow-sm transition z-20
          "
        >
          <FaArrowRight size={20} />
        </button>

        <div
          className="
            w-full mt-10 px-4 sm:px-8 py-4 sm:py-6 
            bg-transparent 
            overflow-hidden 
            relative
          "
          style={{ height: containerHeight }}
        >
          <div
            ref={sliderRef}
            className="flex items-center will-change-transform"
            style={{
              gap: `${gap}px`,
              transform: `translateX(${translateX}px)`,
              transition: "transform 0.4s linear"
            }}
          >
            {reviews.map((item, i) => (
              <div key={i} style={{ minWidth: `${itemWidth}px` }}>
                <ReviewCard
                  name={item.name}
                  review={item.review}
                  rating={item.rating}
                  profile={item.profile}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsSection;