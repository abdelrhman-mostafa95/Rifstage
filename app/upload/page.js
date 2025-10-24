'use client';
import { useState } from 'react';
import { createSong } from '@/functions/songs';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
    });
    const [audioFile, setAudioFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !audioFile) {
            alert('Please enter a title and select an audio file');
            return;
        }

        setLoading(true);
        try {
            await createSong(formData, audioFile, coverFile);
            alert('Song uploaded successfully!');
            router.push('/music');
        } catch (error) {
            console.error('Error uploading song:', error);
            alert('Failed to upload the song');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-white">Upload New Song</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white mb-2">Song Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Artist</label>
                    <input
                        type="text"
                        value={formData.artist}
                        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Audio File (MP3)</label>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Cover Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverFile(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                    {loading ? 'Uploading...' : 'Upload Song'}
                </button>
            </form>
        </div>
    );
}
