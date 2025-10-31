"use client";
import { useState, useEffect } from "react";
import TopSongsSection from "../../components/TopSongsSection";
import PlaylistsSection from "../../components/PlaylistsSection";
import AudioPlayer from "../../components/AudioPlayer";
import { getPlaylists, getSongsByPlaylist } from "../../lib/playlist";
import { getSongs } from "../../functions/songs";

export default function MusicLibraryPage() {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const songsData = await getSongs();
        const playlistsData = await getPlaylists();
        setSongs(songsData || []);
        setPlaylists(playlistsData || []);
        setIsLoading(false);
    };

    const handleSelectPlaylist = async (playlistId) => {
        setIsLoading(true);
        if (!playlistId) {
            const allSongs = await getSongs();
            setSongs(allSongs);
            setCurrentPlaylist(null);
            setIsLoading(false);
            return;
        }

        const data = await getSongsByPlaylist(playlistId);
        setSongs(data?.songs || []);
        setCurrentPlaylist(playlistId);
        setCurrentSongIndex(0);
        setIsPlaying(false);
        setIsLoading(false);
    };

    const handleNext = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex((prev) => prev - 1);
        }
    };

    const handlePlaySong = (song) => {
        const index = songs.findIndex((s) => s.id === song.id);
        if (index !== -1) {
            setCurrentSongIndex(index);
            setIsPlaying(true);
        }
    };

    return (
        <div className="min-h-screen text-white bg-black pb-32 pt-20 relative">
            {/* 🔥 شاشة تحميل كاملة أثناء أي عملية */}
            {isLoading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-red-500 font-semibold text-lg">Loading...</p>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
                <h1 className="text-3xl font-bold mb-4">Music Library</h1>

                <TopSongsSection
                    songs={songs}
                    onSongSelect={(index) => {
                        setCurrentSongIndex(index);
                        setIsPlaying(true);
                    }}
                    currentSongIndex={currentSongIndex}
                />

                <PlaylistsSection
                    playlists={playlists}
                    onSelectPlaylist={handleSelectPlaylist}
                    currentPlaylist={currentPlaylist}
                    onPlaySong={handlePlaySong}
                />
            </div>

            <AudioPlayer
                songs={songs}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                handleNext={handleNext}
                handlePrev={handlePrev}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
        </div>
    );
}
