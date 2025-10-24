'use client';

import { useState } from 'react';
import { addVideo } from '../../lib/supabaseStorage';

export default function VideoForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !youtubeUrl) return alert('Title and YouTube URL are required');

        setLoading(true);
        try {
            await addVideo({
                title,
                youtube_url: youtubeUrl,
                thumbnail_url: thumbnailUrl || null,
            });

            setTitle('');
            setYoutubeUrl('');
            setThumbnailUrl('');

            if (onAdd) onAdd();
        } catch (error) {
            console.error(error);
            alert('Error adding video: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Video</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Video Title *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">YouTube URL *</label>
                    <input
                        type="text"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Thumbnail URL (optional)</label>
                    <input
                        type="text"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? 'Adding...' : 'Add Video'}
                    </button>
                </div>
            </form>
        </div>
    );
}
