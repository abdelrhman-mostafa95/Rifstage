"use client";

import { useState, useEffect, useRef } from "react";
import { addNews, updateNews, uploadNewsImage } from "../../lib/supabaseStorage";

export default function PostForm({ onSuccess, editItem, onCancelEdit }) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [coverFile, setCoverFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const contentRef = useRef(null);

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title || "");
            setSlug(editItem.slug || "");
            setContent(editItem.content || "");
        } else {
            setTitle("");
            setSlug("");
            setContent("");
            setCoverFile(null);
        }
    }, [editItem]);

    const isValidSlug = (value) => /^[a-z0-9-]+$/.test(value);

    const handleInsertImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadNewsImage(file);
            const imgTag = `<img src="${url}" alt="image" class="my-4 rounded-xl border-2 border-red-600 w-full" />`;
            const newContent =
                content.slice(0, contentRef.current.selectionStart) +
                imgTag +
                content.slice(contentRef.current.selectionEnd);
            setContent(newContent);
        } catch (error) {
            console.error("Image upload error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!isValidSlug(slug)) {
            setErrorMsg("❌ Slug must contain only English letters, numbers, and hyphens (-).");
            return;
        }

        setLoading(true);
        try {
            if (editItem) {
                await updateNews(editItem.id, { title, slug, content }, coverFile);
            } else {
                await addNews({ title, slug, content }, coverFile);
            }

            onSuccess?.();
            onCancelEdit?.();
        } catch (error) {
            console.error("Error saving news:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">{editItem ? "Edit News" : "Add New News"}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title & Slug */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none transition"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase())}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white border ${errorMsg ? "border-red-500" : "border-gray-600"} focus:border-red-500 focus:outline-none transition`}
                        required
                    />
                    {errorMsg && <p className="text-white text-sm mt-1">{errorMsg}</p>}
                </div>

                {/* Content + Insert Image */}
                <div className="space-y-2">
                    <label className="flex items-center justify-between text-white font-medium cursor-pointer">
                        Content + Insert Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleInsertImage}
                            className="hidden"
                        />
                    </label>
                    <textarea
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your article..."
                        className="w-full h-80 px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none transition resize-y"
                        required
                    />
                    {/* Preview الصور داخل content */}
                    <div
                        className="mt-2 p-3 rounded-lg bg-gray-700 border border-gray-600 overflow-auto prose prose-invert max-h-64 resize-y"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

                {/* Cover Image */}
                <div className="space-y-1">
                    <label className="text-white font-medium">Cover Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500"
                    />
                    {coverFile && <p className="text-green-400">{coverFile.name}</p>}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Saving..." : editItem ? "Update News" : "Add News"}
                    </button>

                    {editItem && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
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
