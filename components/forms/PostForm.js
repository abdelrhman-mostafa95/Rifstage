"use client";

import { useState } from "react";
import { addNews } from "../../lib/supabaseStorage";

export default function PostForm({ onSuccess }) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); // ✅ لإظهار رسالة الخطأ

    // ✅ دالة التحقق من صلاحية الـ slug
    const isValidSlug = (value) => {
        const regex = /^[a-z0-9-]+$/; // حروف إنجليزية + أرقام + شرطة
        return regex.test(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        // ✅ تحقق من صحة الـ slug قبل الإرسال
        if (!isValidSlug(slug)) {
            setErrorMsg(
                " ❌ Slug must contain only English letters, numbers, and hyphens (-), with no spaces or special characters"
            );
            return;
        }

        setLoading(true);

        try {
            await addNews({ title, slug, content }, imageFile);

            setTitle("");
            setSlug("");
            setContent("");
            setImageFile(null);

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error adding news:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-black p-4 rounded-2xl space-y-3 border border-gray-800"
        >
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
                placeholder="Slug (only English letters, numbers, and -)"
                className={`w-full p-2 rounded-md bg-gray-900 text-white ${errorMsg ? "border border-red-500" : ""
                    }`}
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                required
            />

            {/* ✅ رسالة الخطأ لو الـslug غير صالح */}
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <textarea
                placeholder="Content"
                className="w-full p-2 rounded-md bg-gray-900 text-white h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <div className="space-y-2">
                <label className="text-gray-300 text-sm">
                    Cover Image (optional):
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full text-sm text-gray-300"
                />
                {imageFile && (
                    <p className="text-xs text-gray-400">
                        Selected: {imageFile.name}
                    </p>
                )}
            </div>

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
