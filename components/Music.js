"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // ✅ استيراد router
import { Play, Pause } from "lucide-react";
import { getSongs } from "@/functions/songs";

export default function Music() {
    const router = useRouter(); // ✅ تعريف router
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        loadSongs();
    }, []);

    const loadSongs = async () => {
        try {
            const data = await getSongs();
            if (Array.isArray(data)) setSongs(data);
        } catch (error) {
            console.error("Error loading songs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = (song) => {
        if (currentSong?.id === song.id && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setCurrentSong(song);
            if (audioRef.current) {
                audioRef.current.src = song.audio_url;
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setProgress((current / total) * 100);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
    };

    if (loading) {
        return <div className="text-center text-white p-10">Loading songs...</div>;
    }

    return (
        <div className="m-8 pb-28">
            {/* ---- Header ---- */}
            <div className="flex justify-between items-center p-4">
                <div>
                    <h1 className="text-white text-xl font-bold">Featured Music</h1>
                    <p className="text-gray-400">Listen to the best trending songs</p>
                </div>
                <button
                    onClick={() => router.push("/music")} // ✅ التنقل لصفحة الموسيقى
                    className="text-yellow-500 hover:underline transition"
                >
                    See All
                </button>
            </div>

            {/* ---- Hidden Audio Element ---- */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                className="hidden"
            />

            {/* ---- Music Cards ---- */}
            <div className="container mx-auto p-4">
                {songs.length === 0 ? (
                    <p className="text-gray-400 text-center">No songs available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {songs.slice(0, 3).map((song) => (
                            <div
                                key={song.id}
                                className="relative bg-[#111] rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
                                transition-all duration-300 w-full cursor-pointer group border hover:border-yellow-500"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={song.cover_url || "/default-cover.jpg"}
                                        alt={song.title}
                                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 
                                    group-hover:opacity-100 transition-all duration-500">
                                        <button
                                            className="bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:scale-110 transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePlay(song);
                                            }}
                                        >
                                            {currentSong?.id === song.id && isPlaying ? (
                                                <Pause className="w-6 h-6" />
                                            ) : (
                                                <Play className="w-6 h-6" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 text-white">
                                    <h3 className="text-lg font-semibold truncate">{song.title}</h3>
                                    <p className="text-sm text-gray-400 truncate">{song.artist || "Unknown Artist"}</p>

                                    <div className="flex justify-between items-center text-gray-400 mt-3 text-sm">
                                        <span className="cursor-pointer hover:text-white">⋮</span>
                                        <span>{song.duration || "--:--"}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 🎧 Fixed Player Bar */}
            {currentSong && (
                <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a]/90 backdrop-blur-lg border-t border-gray-700 p-4 flex items-center justify-between z-50">
                    <div className="flex items-center space-x-4">
                        <img
                            src={currentSong.cover_url || "/default-cover.jpg"}
                            alt={currentSong.title}
                            className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="text-white font-semibold">{currentSong.title}</h3>
                            <p className="text-gray-400 text-sm">{currentSong.artist || "Unknown Artist"}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-1/2">
                        <button
                            onClick={togglePlayPause}
                            className="bg-yellow-500 text-black p-3 rounded-full shadow-md hover:scale-110 transition mb-2"
                        >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>
                        <div className="w-full bg-gray-700 h-1 rounded-full">
                            <div
                                className="bg-yellow-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
