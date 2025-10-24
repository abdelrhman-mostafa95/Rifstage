"use client";

import { Play } from "lucide-react";

export default function Music() {
    const data = [
        {
            id: 1,
            image:
                "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
            title: "Song Title",
            artist: "Artist Name",
            duration: "3:45",
        },
        {
            id: 2,
            image:
                "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
            title: "Song Title",
            artist: "Artist Name",
            duration: "3:45",
        },
        {
            id: 3,
            image:
                "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
            title: "Song Title",
            artist: "Artist Name",
            duration: "3:45",
        },
        {
            id: 4,
            image:
                "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
            title: "Song Title",
            artist: "Artist Name",
            duration: "3:45",
        },
    ];

    return (
        <div className="m-8">
            {/* ---- Header ---- */}
            <div className="flex justify-between items-center p-4">
                <div>
                    <h1 className="text-white text-xl font-bold">Featured Music</h1>
                    <p className="text-gray-400">Listen to the best trending songs</p>
                </div>
                <button className="text-yellow-500 hover:underline">See All</button>
            </div>

            {/* ---- Music Cards ---- */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((card) => (
                        <div
                            key={card.id}
                            className="relative bg-[#111] rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
              transition-all duration-300 w-full cursor-pointer group border hover:border-yellow-500"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 
                group-hover:opacity-100 transition-all duration-500">
                                    <button className="bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:scale-110 transition">
                                        <Play className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 text-white">
                                <h3 className="text-lg font-semibold">{card.title}</h3>
                                <p className="text-sm text-gray-400">{card.artist}</p>

                                <div className="flex justify-between items-center text-gray-400 mt-3 text-sm">
                                    <div className="flex space-x-3">
                                        <span className="cursor-pointer hover:text-white">⋮</span>
                                        <span className="cursor-pointer hover:text-red-500">♡</span>
                                    </div>
                                    <span>{card.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
