"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ استيراد useRouter
import { getVideos } from "@/lib/supabaseStorage";

export default function Videos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // ✅ تعريف router

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const data = await getVideos();
            if (Array.isArray(data)) setVideos(data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center text-white p-10">Loading videos...</div>;
    }

    return (
        <section className="m-8">
            {/* ---- Header ---- */}
            <div className="flex justify-between items-center p-4">
                <div>
                    <h1 className="text-white text-xl font-bold">Latest Videos</h1>
                    <p className="text-gray-400">
                        Watch the newest videos from your favorite artists.
                    </p>
                </div>
                <button
                    onClick={() => router.push("/videos")} // ✅ الانتقال إلى صفحة الفيديوهات
                    className="text-yellow-500 hover:underline transition"
                >
                    See All
                </button>
            </div>

            {/* ---- Videos Grid ---- */}
            <div className="container mx-auto p-4">
                {videos.length === 0 ? (
                    <p className="text-gray-400 text-center">No videos available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.slice(0, 3).map((video) => { // ✅ يعرض فقط أول 3 فيديوهات
                            const embedUrl = video.youtube_url?.replace("watch?v=", "embed/");
                            return (
                                <div
                                    key={video.id}
                                    className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
                                >
                                    <iframe
                                        width="100%"
                                        height="250"
                                        src={embedUrl}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-t-2xl"
                                    ></iframe>
                                    <div className="p-5">
                                        <h2 className="text-white font-semibold text-lg md:text-xl truncate">
                                            {video.title}
                                        </h2>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
