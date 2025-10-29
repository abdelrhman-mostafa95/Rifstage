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

    // ✅ لما المستخدم يضغط Edit في NewsDashboard
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

    // ✅ تحقق من صلاحية slug
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
                // ✏️ تحديث خبر موجود
                await updateNews(editItem.id, { title, slug, content }, imageFile);
            } else {
                // 🆕 إضافة خبر جديد
                await addNews({ title, slug, content }, imageFile);
            }

            // ✅ تحديث القائمة بعد الحفظ
            onSuccess?.();
            // 🔄 إلغاء وضع التعديل بعد الحفظ
            onCancelEdit?.();
        } catch (error) {
            console.error("Error saving news:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-black p-4 rounded-2xl space-y-3 border border-gray-800"
        >
            <h2 className="text-white font-semibold text-lg mb-3">
                {editItem ? "✏️ Edit News" : "📰 Add New News"}
            </h2>

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
                className={`w-full p-2 rounded-md bg-gray-900 text-white ${errorMsg ? "border border-red-500" : ""}`}
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                required
            />

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <textarea
                placeholder="Content"
                className="w-full p-2 rounded-md bg-gray-900 text-white h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <div className="space-y-2">
                <label className="text-gray-300 text-sm">Cover Image (optional):</label>
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

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition w-full sm:w-auto"
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
                        onClick={onCancelEdit}
                        className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
