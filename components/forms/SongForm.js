'use client';
import { useState, useEffect } from 'react';
import { addSong, updateSong } from '@/functions/songs';

export default function SongForm({ refreshSongs, editingSong, setEditingSong }) {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
    });
    const [audioFile, setAudioFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fill form when editing
    useEffect(() => {
        if (editingSong) {
            setFormData({
                title: editingSong.title || '',
                artist: editingSong.artist || '',
            });
        }
    }, [editingSong]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            alert('Please enter a song title.');
            return;
        }

        if (!editingSong && !audioFile) {
            alert('Please select an audio file.');
            return;
        }

        setLoading(true);
        try {
            if (editingSong) {
                await updateSong(editingSong.id, formData, audioFile, coverFile);
                alert('Song updated successfully!');
                setEditingSong(null);
            } else {
                await addSong(formData, audioFile, coverFile);
                alert('Song added successfully!');
            }

            setFormData({ title: '', artist: '' });
            setAudioFile(null);
            setCoverFile(null);
            refreshSongs();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingSong(null);
        setFormData({ title: '', artist: '' });
        setAudioFile(null);
        setCoverFile(null);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
                {editingSong ? 'Edit Song' : 'Add New Song'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Song Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Artist Name</label>
                    <input
                        type="text"
                        value={formData.artist}
                        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">
                        Audio File {!editingSong ? '*' : '(optional - leave empty to keep current file)'}
                    </label>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500"
                    />
                    {audioFile && (
                        <p className="text-green-400 text-sm mt-1">✓ {audioFile.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-white mb-2">
                        Cover Image (optional)
                        {editingSong && ' - leave empty to keep current image'}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500"
                    />
                    {coverFile && (
                        <p className="text-green-400 text-sm mt-1">✓ {coverFile.name}</p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? 'Saving...' : editingSong ? 'Update' : 'Add'}
                    </button>

                    {editingSong && (
                        <button
                            type="button"
                            onClick={handleCancel}
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
