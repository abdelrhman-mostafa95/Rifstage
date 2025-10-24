'use client';
import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";


export default function SongCard({ song }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (song.audio_url) {
            audioRef.current = new Audio(song.audio_url);

            audioRef.current.addEventListener('loadedmetadata', () => {
                setDuration(audioRef.current.duration);
            });

            audioRef.current.addEventListener('timeupdate', () => {
                setCurrentTime(audioRef.current.currentTime);
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [song.audio_url]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const value = Number(e.target.value);
        audioRef.current.currentTime = value;
        setCurrentTime(value);
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' + s : s}`;
    };

    return (
        <div className="bg-black rounded-2xl shadow-lg p-4 flex flex-col items-center gap-3 w-full">
            {song.cover_url ? (
                <img src={song.cover_url} alt={song.title} className="w-full h-40 object-cover rounded-xl" />
            ) : (
                <div className="w-full h-40 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                    No Cover
                </div>
            )}

            <h3 className="text-white font-semibold">{song.title}</h3>
            <p className="text-gray-300 text-sm">{song.artist}</p>

            {song.audio_url ? (
                <div className="w-full">
                    {/* Buttons */}
                    <button
                        onClick={handlePlayPause}
                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition w-full flex items-center justify-center gap-2"
                    >
                        {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                    </button>


                    {/* Progress Bar */}
                    <div className="w-full mt-3">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full"
                        />

                        <div className="flex justify-between text-gray-400 text-sm mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-sm mt-2">No audio file</p>
            )}
        </div>
    );
}
