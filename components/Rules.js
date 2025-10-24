"use client";

import {
    FaMobileAlt,
    FaDesktop,
    FaCar,
    FaTv,
    FaClock,
    FaGamepad,
} from "react-icons/fa";

export default function Rules() {
    const devices = [
        { title: "MOBILE & TABLETS", icon: <FaMobileAlt size={28} />, active: true },
        { title: "DESKTOP & LAPTOP", icon: <FaDesktop size={28} />, active: false },
        { title: "CARS", icon: <FaCar size={28} />, active: true },
        { title: "TV & CASTING", icon: <FaTv size={28} />, active: false },
        { title: "WATCH", icon: <FaClock size={28} />, active: true },
        { title: "PLAYSTATION", icon: <FaGamepad size={28} />, active: false },
    ];

    return (
        <section className="text-center py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                YOUR MUSIC, YOUR RULES
            </h2>
            <p className="text-gray-400 mb-10">Blast a jam anywhere, anytime</p>

            <div className="flex flex-wrap justify-center gap-6">
                {devices.map((device, i) => (
                    <div
                        key={i}
                        className={`w-40 h-36 flex flex-col items-center justify-center text-center font-bold
              rounded-[30%] shadow-sm cursor-pointer transition duration-300
              ${device.active
                                ? "bg-yellow-400 text-black"
                                : "bg-white text-black"
                            }
            `}
                    >
                        <div className="mb-3">{device.icon}</div>
                        <span className="text-sm md:text-base">{device.title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
