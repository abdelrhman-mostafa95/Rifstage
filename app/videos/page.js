'use client';

import { useEffect, useState } from 'react';
import { getVideos } from '../../lib/supabaseStorage';

export default function VideosPage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const data = await getVideos();
        setVideos(data);
    };

    return (
        <div className="pt-28 p-6 space-y-4 bg-black min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-white">Videos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => {
                    const embedUrl = video.youtube_url.replace('watch?v=', 'embed/');

                    return (
                        <div
                            key={video.id}
                            className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
                        >
                            <iframe
                                width="100%"
                                height="300"
                                src={embedUrl}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-t-2xl"
                            ></iframe>
                            <div className="p-5">
                                <h2 className="text-white font-semibold text-lg md:text-xl">{video.title}</h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
