"use client";

import { useState, useEffect } from "react";
import { addPlaylist, updatePlaylist } from "../../lib/playlist";

export default function PlaylistForm({ onSuccess, editItem, onCancelEdit }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [coverFile, setCoverFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editItem) {
            setName(editItem.name || "");
            setDescription(editItem.description || "");
        } else {
            setName("");
            setDescription("");
            setCoverFile(null);
        }
    }, [editItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editItem) {
                await updatePlaylist(editItem.id, { name, description }, coverFile);
            } else {
                await addPlaylist({ name, description }, coverFile);
            }

            onSuccess?.();
            onCancelEdit?.();
        } catch (err) {
            console.error("Error saving playlist:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onCancelEdit?.();
        setName("");
        setDescription("");
        setCoverFile(null);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
                {editItem ? "🎧 Edit Playlist" : "➕ Add New Playlist"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Playlist Name *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none h-24"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">
                        Cover Image (optional)
                        {editItem && " - leave empty to keep current image"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500"
                    />
                    {coverFile && (
                        <p className="text-green-400 text-sm mt-1">✓ {coverFile.name}</p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading
                            ? "Saving..."
                            : editItem
                                ? "Update Playlist"
                                : "Add Playlist"}
                    </button>

                    {editItem && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
