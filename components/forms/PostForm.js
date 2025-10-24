'use client';
import { useState } from 'react';

export default function PostForm() {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        console.log('POST_FORM_SUBMIT', { title, excerpt, content, cover });
        alert('واجهة فقط - سيتم النشر لاحقاً');
        setTitle('');
        setExcerpt('');
        setContent('');
        setCover(null);
    };

    return (
        <form onSubmit={submit} className="space-y-4 bg-black p-3 rounded-2xl shadow-md max-w-3xl mx-auto">
            <input
                className="w-full border border-black rounded-2xl p-1 focus:outline-none focus:ring-2 focus:ring-black-600 transition bg-zinc-900"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="w-full border border-black bg-zinc-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                placeholder="Excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
            />
            <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
                    {cover ? cover.name : 'Upload Cover Image'}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setCover(e.target.files?.[0] || null)}
                    />
                </label>
            </div>
            <textarea
                className="w-full border border-gray-900 bg-zinc-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
            />
            <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition font-semibold"
            >
                Publish Post
            </button>
        </form>
    );
}
