"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    getSongsByPlaylist,
    addSongToPlaylist,
    deleteSong,
} from "../../../../lib/playlist";

export default function PlaylistSongsPage() {
    const { id } = useParams(); // playlist_id
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [audioFile, setAudioFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    useEffect(() => {
        if (id) loadSongs();
    }, [id]);

    const loadSongs = async () => {
        setLoading(true);
        const data = await getSongsByPlaylist(id);
        setSongs(data?.songs || []);
        setLoading(false);
    };

    const handleAddSong = async (e) => {
        e.preventDefault();
        if (!audioFile) {
            alert("Please select an audio file.");
            return;
        }

        try {
            setUploading(true);
            await addSongToPlaylist({
                playlist_id: id,
                title,
                artist,
                audio_file: audioFile,
                cover_file: coverFile,
            });
            setTitle("");
            setArtist("");
            setAudioFile(null);
            setCoverFile(null);
            loadSongs();
        } catch (err) {
            console.error("Error adding song:", err);
            alert("Failed to add song");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (songId) => {
        if (!confirm("Delete this song?")) return;
        await deleteSong(songId);
        loadSongs();
    };

    return (
        <div className="space-y-6 text-white">
            <h1 className="text-2xl font-bold">🎵 Songs in Playlist</h1>

            {/* ✅ Add New Song Form */}
            <form
                onSubmit={handleAddSong}
                className="bg-zinc-900 p-6 rounded-2xl space-y-5 border border-zinc-800"
            >
                <h2 className="text-lg font-semibold">Add New Song</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-sm font-medium">Song Title</label>
                        <input
                            type="text"
                            placeholder="Enter song title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="bg-zinc-800 p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-sm font-medium">Artist Name</label>
                        <input
                            type="text"
                            placeholder="Enter artist name"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            required
                            className="bg-zinc-800 p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-sm font-medium">Choose Audio File</label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setAudioFile(e.target.files[0])}
                            required
                            className="bg-zinc-800 p-2 rounded-lg text-gray-300 cursor-pointer"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-sm font-medium">Choose Cover Image (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setCoverFile(e.target.files[0])}
                            className="bg-zinc-800 p-2 rounded-lg text-gray-300 cursor-pointer"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className={`px-6 py-2 rounded-full font-semibold transition ${uploading
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                >
                    {uploading ? "Uploading..." : "+ Add Song"}
                </button>
            </form>

            {/* ✅ Songs List */}
            {loading ? (
                <p>Loading...</p>
            ) : songs.length === 0 ? (
                <p className="text-gray-400">No songs in this playlist yet.</p>
            ) : (
                <div className="space-y-3">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="bg-black p-4 rounded-2xl flex justify-between items-center hover:bg-zinc-900 transition border border-zinc-800"
                        >
                            <div className="flex items-center gap-3">
                                {song.cover_url && (
                                    <img
                                        src={song.cover_url}
                                        alt={song.title}
                                        className="w-14 h-14 object-cover rounded-xl"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold">{song.title}</h3>
                                    <p className="text-gray-400 text-sm">{song.artist}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(song.id)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
