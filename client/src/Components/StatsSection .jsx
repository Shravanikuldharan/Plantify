import React, { useEffect, useState } from "react";

import plantsIcon from "./../assets/stat1.png";
import categoriesIcon from "./../assets/stat2.png";
import saplingsIcon from "./../assets/stat3.png";
import expertsIcon from "./../assets/stat4.png";

const statsData = [
    { id: 1, icon: plantsIcon, number: 3000, label: "Plants Delivered" },
    { id: 2, icon: categoriesIcon, number: 15, label: "Plant Categories" },
    { id: 3, icon: saplingsIcon, number: 5000, label: "Healthy Saplings" },
    { id: 4, icon: expertsIcon, number: 20, label: "Garden Experts" },
];

const StatsSection = () => {
    const [counts, setCounts] = useState(statsData.map(() => 1));

    useEffect(() => {
        const duration = 2000;
        const frameRate = 30;
        const totalFrames = Math.round(duration / (1000 / frameRate));

        const interval = setInterval(() => {
            setCounts((prev) =>
                prev.map((value, index) => {
                    const target = statsData[index].number;
                    const increment = Math.ceil(target / totalFrames);
                    return value < target ? Math.min(value + increment, target) : target;
                })
            );
        }, 1000 / frameRate);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-10 mt-10 mb-[40px]">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {statsData.map((stat, index) => (
                    <div
                        key={stat.id}
                        className="
                        flex flex-col items-center pt-8 pb-6 
                        bg-gradient-to-br from-green-50 to-green-200
                        border-b-4 border-green-500 rounded-xl rounded-b-2xl
                        relative
                        transition-all duration-500 
                        hover:-translate-y-2 hover:shadow-xl cursor-pointer
                    "
                    >
                        <img
                            src={stat.icon}
                            className="w-14 h-14 transition duration-300"
                        />

                        <h2 className="text-4xl font-semibold text-green-700 mt-4">
                            {counts[index]}+
                        </h2>

                        <p className="text-gray-700 text-lg font-semibold mt-4 tracking-wide">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;