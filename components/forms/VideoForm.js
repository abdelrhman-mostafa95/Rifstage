'use client';

import { useState } from 'react';
import { addVideo } from '../../lib/supabaseStorage';

export default function VideoForm({ onAdd }) {
    const [form, setForm] = useState({
        title: '',
        youtubeUrl: '',
        thumbnailUrl: '',
        description: '',
        duration: '',
        views: '',
        createdText: '', // إضافة حقل created_text
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.youtubeUrl) return alert('Title and URL required');
        setLoading(true);
        try {
            await addVideo({
                title: form.title,
                youtube_url: form.youtubeUrl,
                thumbnail_url: form.thumbnailUrl || null,
                description: form.description || '',
                duration: form.duration || '',
                views: form.views || '0',
                created_text: form.createdText || '', // أخذ القيمة من الفورم
            });
            setForm({ title: '', youtubeUrl: '', thumbnailUrl: '', description: '', duration: '', views: '', createdText: '' });
            if (onAdd) onAdd();
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Video</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: 'Video Title *', name: 'title' },
                    { label: 'YouTube URL *', name: 'youtubeUrl' },
                    { label: 'Thumbnail URL', name: 'thumbnailUrl' },
                    { label: 'Description', name: 'description' },
                    { label: 'Duration (e.g. 4:23)', name: 'duration' },
                    { label: 'Views', name: 'views' },
                    { label: 'Created Text', name: 'createdText' }, // حقل جديد
                ].map((f) => (
                    <div key={f.name}>
                        <label className="block text-white mb-2">{f.label}</label>
                        <input
                            type="text"
                            name={f.name}
                            value={form[f.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                >
                    {loading ? 'Adding...' : 'Add Video'}
                </button>
            </form>
        </div>
    );
}
