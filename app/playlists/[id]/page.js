"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SongCard from "@/components/SongCard";
import { getSongsByPlaylist } from "@/lib/playlist"; // الدالة اللي بترجع الأغاني الخاصة بالبلاي لست

export default function PlaylistDetailsPage() {
    const { id } = useParams(); // نجيب ID من الـ URL
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchPlaylistSongs();
    }, [id]);

    const fetchPlaylistSongs = async () => {
        try {
            setLoading(true);
            const data = await getSongsByPlaylist(id);
            setSongs(data.songs || []);
            setPlaylist(data.playlist || null);
        } catch (error) {
            console.error("Error loading playlist songs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 pt-20 text-white">
            {playlist && (
                <div className="mb-8 text-center">
                    {playlist.cover_url && (
                        <img
                            src={playlist.cover_url}
                            alt={playlist.title}
                            className="w-full max-h-72 object-cover rounded-2xl mb-4 shadow-lg"
                        />
                    )}
                    <h1 className="text-3xl font-bold mb-2">{playlist.title}</h1>
                    <p className="text-gray-400">{playlist.description}</p>
                </div>
            )}

            {loading ? (
                <p className="text-gray-400 text-center">Loading songs...</p>
            ) : songs.length === 0 ? (
                <p className="text-gray-400 text-center">No songs in this playlist.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {songs.map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            )}
        </div>
    );
}
