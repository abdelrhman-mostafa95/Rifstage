'use client';

import VideoForm from '@/components/forms/VideoForm';
import { useEffect, useState } from 'react';
import { getVideos, addVideo, deleteVideo } from '../../../lib/supabaseStorage';

export default function VideosDashboard() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const data = await getVideos();
        setVideos(data);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        await deleteVideo(id);
        // بعد الحذف، جلب الفيديوهات مرة أخرى
        fetchVideos();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Videos</h1>

            {/* Video Form */}
            <VideoForm onAdd={fetchVideos} />

            {/* Videos List */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video) => (
                    <div key={video.id} className="bg-black rounded-2xl shadow-md p-4 flex flex-col justify-between">
                        <div>
                            <div className="font-medium">{video.title}</div>
                            <div className="text-gray-500 text-sm">ID: {video.youtube_url}</div>
                        </div>
                        <button
                            onClick={() => handleDelete(video.id)}
                            className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
