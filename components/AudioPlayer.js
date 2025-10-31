"use client";
import { useEffect, useRef, useState } from "react";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    Loader2,
} from "lucide-react";

export default function AudioPlayer({
    songs,
    currentSongIndex,
    setCurrentSongIndex,
    handleNext,
    handlePrev,
    isPlaying,
    setIsPlaying,
}) {
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isShuffling, setIsShuffling] = useState(false);
    const [repeatMode, setRepeatMode] = useState("off"); // off | one | all
    const [isLoading, setIsLoading] = useState(false); // ⏳

    const currentSong = songs[currentSongIndex];

    useEffect(() => {
        if (!audioRef.current || songs.length === 0) return;
        const audio = audioRef.current;
        audio.volume = volume;

        if (isPlaying) {
            setIsLoading(true);
            audio.play().catch(() => setIsLoading(false));
        } else {
            audio.pause();
        }
    }, [isPlaying, currentSongIndex, songs, volume]);

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        setCurrentTime(audio.currentTime);
        if (progressRef.current)
            progressRef.current.value = (audio.currentTime / audio.duration) * 100;
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const newTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleEnded = () => {
        if (repeatMode === "one") {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else if (isShuffling) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentSongIndex(randomIndex);
        } else if (currentSongIndex < songs.length - 1) {
            handleNext();
        } else if (repeatMode === "all") {
            setCurrentSongIndex(0);
        } else {
            setIsPlaying(false);
        }
    };

    const toggleRepeat = () => {
        if (repeatMode === "off") setRepeatMode("all");
        else if (repeatMode === "all") setRepeatMode("one");
        else setRepeatMode("off");
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    if (!currentSong) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 text-white z-50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Song Info */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative">
                        <img
                            src={currentSong.cover_url}
                            alt={currentSong.title}
                            className={`w-14 h-14 object-cover rounded-full transition-transform ${isPlaying ? "animate-spin-slow" : ""
                                }`}
                        />
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                                <Loader2 className="animate-spin text-white w-5 h-5" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold">{currentSong.title}</h3>
                        <p className="text-gray-400 text-sm">{currentSong.artist}</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-2 w-full md:w-[40%]">
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => setIsShuffling(!isShuffling)}
                            className={`${isShuffling ? "text-red-500" : "text-gray-400"
                                } hover:text-white`}
                        >
                            <Shuffle size={18} />
                        </button>

                        <button onClick={handlePrev}>
                            <SkipBack />
                        </button>

                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            disabled={isLoading}
                            className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:scale-105 transition disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : isPlaying ? (
                                <Pause />
                            ) : (
                                <Play />
                            )}
                        </button>

                        <button onClick={handleNext}>
                            <SkipForward />
                        </button>

                        <button
                            onClick={toggleRepeat}
                            className={`${repeatMode !== "off" ? "text-red-500" : "text-gray-400"
                                } hover:text-white`}
                        >
                            <Repeat size={18} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 w-full">
                        <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>

                        {isLoading ? (
                            // 🎶 shimmer bar أثناء التحميل
                            <div className="relative flex-1 h-2 rounded-full overflow-hidden bg-zinc-800">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-400/50 to-red-500/20 animate-[shimmer_1.5s_infinite]"></div>
                            </div>
                        ) : (
                            <input
                                ref={progressRef}
                                type="range"
                                min="0"
                                max="100"
                                defaultValue="0"
                                onChange={handleSeek}
                                className="flex-1 accent-red-600 cursor-pointer"
                            />
                        )}

                        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2 w-32 md:w-40">
                    <Volume2 size={18} />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="accent-red-600 cursor-pointer flex-1"
                    />
                </div>
            </div>

            <audio
                ref={audioRef}
                src={currentSong.audio_url}
                onLoadStart={() => setIsLoading(true)} // بدأ التحميل
                onCanPlay={() => setIsLoading(false)} // جاهز للتشغيل
                onPlaying={() => setIsLoading(false)} // بدأ فعليًا
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
                onEnded={handleEnded}
            />

            {/* ✨ animation keyframes */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    );
}
