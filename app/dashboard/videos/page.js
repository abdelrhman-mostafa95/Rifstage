'use client';

import { useEffect, useState } from 'react';
import { getVideos, addVideo, deleteVideo, updateVideo } from '../../../lib/supabaseStorage';

export default function VideosDashboard() {
    const [videos, setVideos] = useState([]);
    const [editingVideo, setEditingVideo] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        youtube_url: '',
        thumbnail_url: '',
        description: '',
        duration: '',
        views: '',
        created_text: '',
    });

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const data = await getVideos();
        setVideos(data);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this video?")) return;
        await deleteVideo(id);
        fetchVideos();
    };

    const handleEdit = (video) => {
        setEditingVideo(video);
        setFormData(video);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingVideo) {
            await updateVideo(editingVideo.id, formData);
            setEditingVideo(null);
        } else {
            await addVideo(formData);
        }

        await fetchVideos();
        setFormData({
            title: '',
            youtube_url: '',
            thumbnail_url: '',
            description: '',
            duration: '',
            views: '',
            created_text: '',
        });
    };

    const handleCancelEdit = () => {
        setEditingVideo(null);
        setFormData({
            title: '',
            youtube_url: '',
            thumbnail_url: '',
            description: '',
            duration: '',
            views: '',
            created_text: '',
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Videos</h1>

            {/* ====== Video Form ====== */}
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl space-y-4 shadow-md">
                <h2 className="text-xl text-white font-semibold mb-2">
                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full p-3 rounded-xl bg-gray-600 text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition"
                    />
                    <input
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleChange}
                        placeholder="YouTube URL"
                        className="w-full p-3 rounded-xl bg-gray-600 text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition"
                    />
                    <input
                        name="thumbnail_url"
                        value={formData.thumbnail_url}
                        onChange={handleChange}
                        placeholder="Thumbnail URL"
                        className="w-full p-3 rounded-xl bg-gray-600 text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition"
                    />
                    <input
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Duration (e.g. 5:30)"
                        className="w-full p-3 rounded-xl bg-gray-600 text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition"
                    />
                    <input
                        name="views"
                        value={formData.views}
                        onChange={handleChange}
                        placeholder="Views"
                        className="w-full p-3 rounded-xl bg-gray-600 text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition"
                    />
                    <input
                        name="created_text"
                        value={formData.created_text}
                        onChange={handleChange}
                        placeholder="Created text (e.g. 2 days ago)"
                        className="w-full p-3 rounded-xl bg-gray-600 text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition"
                    />
                </div>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-3 rounded-xl bg-gray-600 text-white border border-gray-700 focus:border-blue-600 focus:outline-none transition"
                    rows="3"
                />

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className={`px-5 py-2 rounded-full font-medium transition ${editingVideo
                            ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                            : 'bg-red-600 text-white hover:bg-green-700'
                            }`}
                    >
                        {editingVideo ? 'Update Video' : 'Add Video'}
                    </button>

                    {editingVideo && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* ====== Videos List ====== */}
            <div className="space-y-3 mt-6">
                {videos.length === 0 ? (
                    <p className="text-gray-400">No videos yet.</p>
                ) : (
                    videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-black rounded-2xl shadow-md p-4 flex items-center justify-between hover:bg-zinc-900 transition"
                        >
                            <div className="flex items-center gap-3">
                                {video.thumbnail_url && (
                                    <img
                                        src={video.thumbnail_url}
                                        alt={video.title}
                                        className="w-14 h-14 object-cover rounded-xl"
                                    />
                                )}
                                <div>
                                    <h3 className="text-white font-semibold">{video.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                        {video.description || 'No description'}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        🔗 {video.youtube_url} — ⏱ {video.duration || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(video)}
                                    className="px-3 py-1 text-sm rounded-full bg-gray-600 text-white hover:bg-gray-700 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(video.id)}
                                    className="px-3 py-1 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
