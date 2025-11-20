import React from 'react';
import imgStar from '../assets/star.png';
import imgUnStar from '../assets/unstar.png';

function ReviewCard({ name, review, rating, profile }) {
  return (
    <div
      className="
        relative rounded-3xl shadow-lg w-full sm:w-80 
        p-6 border border-green-300
        flex flex-col
        transition-all duration-500
        hover:shadow-2xl hover:-translate-y-2 hover:brightness-105
        bg-white
        overflow-hidden
      "
    >

      <div className="
        absolute bottom-0 left-0 w-full h-24 
        bg-gradient-to-t from-green-200/40 via-green-100/20 to-transparent
        pointer-events-none
        transition-all duration-500
        group-hover:h-32
      "></div>

      <p className="text-gray-700 text-md font-[400px] text-center leading-relaxed mb-4 relative z-10">
        “{review}”
      </p>

      {/* star rating logic */}
      <div className="flex items-center justify-center mb-4 relative z-10">
        {Array.from({ length: rating }).map((_, i) => (
          <img src={imgStar} key={i} className="w-5 h-5 mr-1" />
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <img src={imgUnStar} key={i} className="w-5 h-5 mr-1" />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-3 relative z-10">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-500 shadow-md">
          <img src={profile} className="w-full h-full object-cover" />
        </div>

        <h3 className="text-lg font-semibold text-green-700">
          {name}
        </h3>
      </div>

    </div>
  );
}

export default ReviewCard;