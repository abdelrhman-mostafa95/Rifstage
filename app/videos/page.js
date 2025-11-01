// app/music/page.js
'use client';

import { useEffect, useState } from 'react';
import { getVideos } from '../../lib/supabaseStorage';
import VideoCard from '../../components/VideoCard';

export default function VideosPage() {
    const [videos, setVideos] = useState([]);
    const [featured, setFeatured] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const data = await getVideos();
        setVideos(data);
        if (data?.length) setFeatured(data[0]);
    };

    if (!videos.length)
        return <div className="text-white text-center mt-20">Loading videos...</div>;

    const extractId = (url) => {
        const match = url.match(/v=([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    const others = videos.filter((v) => v.id !== featured?.id);

    return (
        <div className="pt-28 p-6 bg-black min-h-screen">
            <h1 className="text-4xl font-bold mb-2 text-white text-left">Video Library</h1>
            <p className="text-gray-400 mb-8 text-left">
                Watch the best music videos, interviews, and exclusive behind-the-scenes
            </p>

            {/* Featured video */}
            {featured && (
                <div className="mb-10">
                    <VideoCard
                        video={featured}
                        onPlay={() => {
                            setFeatured({ ...featured });
                        }}
                        featured
                        layout="reverse" // new prop for VideoCard to place video on right
                    />
                </div>
            )}

            {/* Other videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {others.map((video) => (
                    <div
                        key={video.id}
                        className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
                        onClick={() => setFeatured(video)}
                    >
                        <div className="relative">
                            <img
                                src={
                                    video.thumbnail_url ||
                                    `https://img.youtube.com/vi/${extractId(video.youtube_url)}/hqdefault.jpg`
                                }
                                alt={video.title}
                                className="w-full h-56 md:h-60 object-cover"
                            />
                        </div>

                        <div className="p-4 text-white space-y-1 text-left">
                            <h2 className="text-lg font-bold">{video.title}</h2>
                            <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                            <div className="flex justify-between text-gray-500 text-xs mt-2">
                                <span>{video.duration}</span>
                                <span>{video.views} views</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
