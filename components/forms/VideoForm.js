'use client';
import { useState } from 'react';

export default function VideoForm() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const submit = (e) => {
        e.preventDefault();
        console.log('VIDEO_FORM_SUBMIT', { title, url });
        alert('واجهة فقط - سيتم إضافة الحفظ لاحقاً');
        setTitle('');
        setUrl('');
    };

    return (
        <form onSubmit={submit} className="space-y-4 bg-black p-3 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <input
                className="w-full border border-gray-300 bg-zinc-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="w-full border border-gray-300 rounded-2xl bg-zinc-900 p-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                placeholder="YouTube Video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition font-semibold"
            >
                Add Video
            </button>
        </form>
    );
}
