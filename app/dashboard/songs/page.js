'use client';
import { useState, useEffect } from 'react';
import SongForm from '@/components/forms/SongForm';
import { getSongs, deleteSong } from '@/functions/songs';

export default function SongsDashboard() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSongs = async () => {
        setLoading(true);
        try {
            const data = await getSongs();
            setSongs(data);
        } catch (error) {
            console.error('Error fetching songs:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('هل أنت متأكد من حذف هذه الأغنية؟')) return;
        try {
            await deleteSong(id);
            alert('تم حذف الأغنية بنجاح!');
            fetchSongs();
        } catch (error) {
            console.error('Error deleting song:', error.message);
            alert('فشل حذف الأغنية');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">الأغاني</h1>

            <SongForm refreshSongs={fetchSongs} />

            <div className="mt-6">
                <h2 className="font-semibold mb-3 text-lg text-white">قائمة الأغاني</h2>
                {loading ? (
                    <p className="text-white">جاري التحميل...</p>
                ) : songs.length === 0 ? (
                    <p className="text-gray-400">لا توجد أغاني حتى الآن.</p>
                ) : (
                    <ul className="space-y-3 text-white">
                        {songs.map((song) => (
                            <li
                                key={song.id}
                                className="bg-black rounded-2xl shadow-md p-4 flex items-center justify-between"
                            >
                                <div>
                                    <span className="font-medium block">{song.title}</span>
                                    {song.artist && (
                                        <span className="text-sm text-gray-400">{song.artist}</span>
                                    )}
                                </div>

                                <button
                                    className="px-4 py-2 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                                    onClick={() => handleDelete(song.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}