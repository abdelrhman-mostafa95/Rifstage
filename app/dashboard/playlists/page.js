"use client";

import { useEffect, useState } from "react";
import PlaylistForm from "@/components/forms/PlaylistForm";
import { getPlaylists, deletePlaylist } from "../../../lib/playlist";
import Link from "next/link";

export default function PlaylistsDashboard() {
    const [playlists, setPlaylists] = useState([]);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getPlaylists();
        setPlaylists(data || []);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this playlist?")) return;
        await deletePlaylist(id);
        loadData();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Playlists</h1>

            <PlaylistForm
                onSuccess={loadData}
                editItem={editItem}
                onCancelEdit={() => setEditItem(null)}
            />

            <div className="space-y-3 mt-6">
                {playlists.length === 0 ? (
                    <p className="text-gray-400">No playlists yet.</p>
                ) : (
                    playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="bg-black rounded-2xl shadow-md p-4 flex items-center justify-between hover:bg-zinc-900 transition"
                        >
                            <div className="flex items-center gap-3">
                                {playlist.cover_url && (
                                    <img
                                        src={playlist.cover_url}
                                        alt={playlist.title}
                                        className="w-14 h-14 object-cover rounded-xl"
                                    />
                                )}
                                <div>
                                    <h3 className="text-white font-semibold">
                                        {playlist.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {playlist.description || "No description"}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        🎧 {playlist.producer_name || "Unknown"} — 🗓 {playlist.release_date || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link
                                    href={`/dashboard/playlists/${playlist.id}`}
                                    className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    View
                                </Link>

                                <button
                                    onClick={() => setEditItem(playlist)}
                                    className="px-3 py-1 text-sm rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(playlist.id)}
                                    className="px-3 py-1 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
