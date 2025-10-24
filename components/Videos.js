"use client";

import { Play } from "lucide-react";

export default function Videos() {
    const videos = [
        {
            id: 1,
            thumbnail: "https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
            title: "Top 10 Music Videos of 2025",
            description: "Watch the hottest tracks of the year in one playlist.",
        },
        {
            id: 2,
            thumbnail:
                "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/12/10/12/hozier2.jpg",
            title: "Live Concert Highlights",
            description: "Experience the energy of live performances.",
        },
        {
            id: 3,
            thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
            title: "Behind the Scenes",
            description: "Exclusive look into music video productions.",
        },
    ];

    return (
        <section className="m-8">
            <div className="flex justify-between items-center p-4">
                <div>
                    <h1 className="text-white text-xl font-bold">Latest Videos</h1>
                    <p className="text-gray-400">
                        Watch the newest videos from your favorite artists.
                    </p>
                </div>
                <button className="text-yellow-500 hover:underline">See All</button>
            </div>

            {/* Grid + Cards */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md hover:shadow-yellow-500/30 transition-all duration-500 ease-out w-full cursor-pointer group hover:-translate-y-2 relative"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition duration-500">
                                        <div className="bg-yellow-500 p-4 rounded-full shadow-lg hover:scale-110 transform transition">
                                            <Play className="w-8 h-8 text-black" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-200 group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                    {video.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
