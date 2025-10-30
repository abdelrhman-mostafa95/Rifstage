"use client";

import { useState, useEffect } from "react";
import { addNews, updateNews } from "../../lib/supabaseStorage";

export default function PostForm({ onSuccess, editItem, onCancelEdit }) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title || "");
            setSlug(editItem.slug || "");
            setContent(editItem.content || "");
        } else {
            setTitle("");
            setSlug("");
            setContent("");
            setImageFile(null);
        }
    }, [editItem]);

    const isValidSlug = (value) => /^[a-z0-9-]+$/.test(value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!isValidSlug(slug)) {
            setErrorMsg(
                "❌ Slug must contain only English letters, numbers, and hyphens (-), with no spaces or special characters."
            );
            return;
        }

        setLoading(true);
        try {
            if (editItem) {
                await updateNews(editItem.id, { title, slug, content }, imageFile);
            } else {
                await addNews({ title, slug, content }, imageFile);
            }

            onSuccess?.();
            onCancelEdit?.();
        } catch (error) {
            console.error("Error saving news:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onCancelEdit?.();
        setTitle("");
        setSlug("");
        setContent("");
        setImageFile(null);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
                {editItem ? "Edit News" : "Add New News"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Title *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">
                        Slug (only lowercase letters, numbers, and -) *
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase())}
                        className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${errorMsg ? "border-red-500" : "border-gray-600"
                            } focus:border-red-500 focus:outline-none`}
                        required
                    />
                    {errorMsg && (
                        <p className="text-red-400 text-sm mt-1">{errorMsg}</p>
                    )}
                </div>

                <div>
                    <label className="block text-white mb-2">Content *</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none h-32"
                        required
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
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500"
                    />
                    {imageFile && (
                        <p className="text-green-400 text-sm mt-1">✓ {imageFile.name}</p>
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
                                ? "Update News"
                                : "Add News"}
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
