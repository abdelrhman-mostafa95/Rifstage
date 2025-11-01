// components/VideoCard.js
import { Play } from 'lucide-react';
import VideoEmbed from './VideoEmbed';
import { useState } from 'react';

export default function VideoCard({ video, featured }) {
    const [isPlaying, setIsPlaying] = useState(false); // To play video inside the same card

    const extractId = (url) => {
        const match = url.match(/v=([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    return (
        <div className="bg-zinc-900 rounded-xl p-4 md:p-6 flex flex-col md:flex-row-reverse gap-6 shadow-lg">
            <div className="relative w-full md:w-2/3 rounded-xl overflow-hidden">
                {isPlaying ? (
                    <VideoEmbed youtubeId={extractId(video.youtube_url)} />
                ) : (
                    <img
                        src={
                            video.thumbnail_url ||
                            `https://img.youtube.com/vi/${extractId(video.youtube_url)}/hqdefault.jpg`
                        }
                        alt={video.title}
                        className="w-full h-64 md:h-80 object-cover rounded-xl"
                    />
                )}

                {/* Play button always on the image */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="bg-red-600 hover:bg-red-700 text-white p-3 md:p-4 rounded-md transition"
                        >
                            <Play size={22} />
                        </button>
                    </div>
                )}

                {/* Video duration */}
                {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                    </span>
                )}
            </div>

            {/* Video details */}
            <div className="flex-1 flex flex-col justify-center text-left">
                <span className="text-sm text-gray-400 bg-zinc-800 px-2 py-1 rounded w-fit self-start mb-2">
                    Clip
                </span>


                <h3 className="text-white font-semibold text-base md:text-lg mb-1">
                    {video.title}
                </h3>

                {/* New: description */}
                {video.description && (
                    <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-2">
                        {video.description}
                    </p>
                )}

                {/* New: stats */}
                <div className="flex justify-start items-center text-gray-400 text-xs md:text-sm gap-3 mb-4">
                    {video.views !== undefined && <span>{video.views} views</span>}
                    {video.duration && <><span>•</span><span>{video.duration}</span></>}
                </div>
                {video.created_text && (
                    <div className="text-gray-400 text-xs md:text-sm mb-2">
                        Added on: {video.created_text}
                    </div>
                )}

                {/* Watch button inside card */}
                {!isPlaying && (
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-md w-fit self-start transition"
                    >
                        Watch Now
                    </button>
                )}
            </div>
        </div>
    );
}
