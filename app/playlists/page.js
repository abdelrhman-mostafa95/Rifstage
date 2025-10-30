"use client";

import { useEffect, useState } from "react";
import { getPlaylists } from "../../lib/playlist";
import Link from "next/link";

export default function PlaylistsPage() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        setLoading(true);
        try {
            const data = await getPlaylists();
            setPlaylists(data || []);
        } catch (error) {
            console.error("Error loading playlists:", error);
        }
        setLoading(false);
    };

    return (
        <div className="pt-24 min-h-screen text-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Explore Playlists</h1>

                {loading ? (
                    <p className="text-gray-400 text-center">Loading playlists...</p>
                ) : playlists.length === 0 ? (
                    <div className="text-gray-400 bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center">
                        No playlists available yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {playlists.map((playlist) => (
                            <Link
                                key={playlist.id}
                                href={`/playlists/${playlist.id}`}
                                className="group block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform shadow-lg"
                            >
                                {playlist.cover_url && (
                                    <img
                                        src={playlist.cover_url}
                                        alt={playlist.title}
                                        className="w-full h-48 object-cover group-hover:opacity-90 transition"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{playlist.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                        {playlist.description || "No description available."}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
