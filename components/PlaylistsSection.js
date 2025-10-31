"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PlaylistsSection({
    playlists,
    onSelectPlaylist,
    currentPlaylist,
    onPlaySong,
    onLoadSongs, // لتحميل كل الأغاني الخاصة بالبلاي ليست
}) {
    const [loadingId, setLoadingId] = useState(null);

    if (!playlists || playlists.length === 0)
        return (
            <p className="text-gray-400 text-center py-10">
                No playlists yet.
            </p>
        );

    const handleSelect = async (playlistId) => {
        setLoadingId(playlistId);
        onSelectPlaylist(playlistId);

        // ✅ جلب الأغاني من جدول playlist_songs
        const { data: playlistSongs, error } = await supabase
            .from("playlist_songs")
            .select("*")
            .eq("playlist_id", playlistId)
            .order("created_at", { ascending: true });

        setLoadingId(null);

        if (error) {
            console.error("Error fetching playlist songs:", error);
            return;
        }

        if (playlistSongs && playlistSongs.length > 0) {
            // حفظ الأغاني كلها في الـ state الرئيسي
            if (onLoadSongs) onLoadSongs(playlistSongs);

            // ✅ تشغيل أول أغنية تلقائيًا
            const firstSong = playlistSongs[0];
            if (firstSong?.audio_url && onPlaySong) {
                onPlaySong(firstSong);
            } else {
                console.warn("First song has no audio_url!");
            }
        } else {
            console.warn("No songs found in this playlist");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-10">
            <h2 className="text-4xl font-bold text-white text-center">🎵 Playlists</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {playlists.map((playlist) => (
                    <div
                        key={playlist.id}
                        onClick={() => handleSelect(playlist.id)}
                        className={`relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:shadow-red-600/40 ${currentPlaylist === playlist.id
                            ? "ring-4 ring-red-600 scale-[1.02]"
                            : ""
                            }`}
                        style={{ height: "400px" }}
                    >
                        {/* ✅ صورة الخلفية */}
                        {playlist.cover_url ? (
                            <img
                                src={playlist.cover_url}
                                alt={playlist.title}
                                className="absolute inset-0 w-full h-full object-cover bg-black transition-all duration-500"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-7xl text-red-600">
                                🎶
                            </div>
                        )}

                        {/* ✅ التظليل */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                        {/* ✅ المحتوى */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                                {playlist.title}
                                {loadingId === playlist.id && (
                                    <span className="animate-spin text-sm text-gray-300">⏳</span>
                                )}
                            </h3>

                            {playlist.description && (
                                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                    {playlist.description}
                                </p>
                            )}

                            {playlist.created_at && (
                                <p className="text-xs text-gray-400">
                                    Added on {formatDate(playlist.created_at)}
                                </p>
                            )}

                            {/* ✅ زر التشغيل */}
                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelect(playlist.id);
                                    }}
                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold shadow-lg transition-all"
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
