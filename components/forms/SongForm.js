// components/forms/SongForm.js
'use client';
import { useState } from 'react';

export default function SongForm() {
    const [title, setTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('SONG_FORM_SUBMIT', { title, artistName, audioFile, coverFile });
        alert('هذه واجهة فقط - سيتم الحفظ بعد إضافة الباك إند لاحقاً');
        setTitle('');
        setArtistName('');
        setAudioFile(null);
        setCoverFile(null);
    };

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-4 bg-black p-4 sm:p-6 rounded-2xl shadow-lg max-w-3xl mx-auto"
        >
            <input
                className="w-full border border-gray-300 bg-zinc-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                placeholder="Song Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                className="w-full border border-gray-300 bg-zinc-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                placeholder="Artist Name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-3">
                <label className="cursor-pointer bg-red-600 text-center w-full text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
                    {audioFile ? audioFile.name : 'Upload Audio File'}
                    <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                    />
                </label>

                <label className="cursor-pointer bg-red-600 text-center w-full text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
                    {coverFile ? coverFile.name : 'Upload Cover Image'}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                    />
                </label>
            </div>

            <button
                type="submit"
                className="bg-red-600 w-full text-white px-6 py-3 rounded-full hover:bg-red-700 transition font-semibold"
            >
                Save Song
            </button>
        </form>
    );
}
