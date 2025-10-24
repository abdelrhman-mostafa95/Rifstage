"use client";

import { useState } from "react";
import { addNews } from "../../lib/supabaseStorage";

export default function PostForm({ onSuccess }) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addNews({
                title,
                slug,
                content,
                cover_image_url: null, // هنعدل دي لما نضيف upload
            });

            setTitle("");
            setSlug("");
            setContent("");

            if (onSuccess) onSuccess();

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-black p-4 rounded-2xl space-y-3">
            <input
                type="text"
                placeholder="Title"
                className="w-full p-2 rounded-md bg-gray-900 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Slug (news-title-example)"
                className="w-full p-2 rounded-md bg-gray-900 text-white"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
            />

            <textarea
                placeholder="Content"
                className="w-full p-2 rounded-md bg-gray-900 text-white h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition w-full"
            >
                {loading ? "Saving..." : "Add News"}
            </button>
        </form>
    );
}
