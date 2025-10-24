'use client';
import { useState, useEffect } from 'react';
import SongCard from '@/components/SongCard';
import { getSongs } from '@/functions/songs';

export default function MusicPage() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const data = await getSongs();
                setSongs(data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
            <h1 className="text-2xl font-bold mb-6 text-white">Music</h1>

            {loading ? (
                <p className="text-white">Loading...</p>
            ) : songs.length === 0 ? (
                <p className="text-white">No songs available.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {songs.map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            )}
        </div>
    );
}
