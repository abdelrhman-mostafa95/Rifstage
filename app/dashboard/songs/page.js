
import SongForm from '@/components/forms/SongForm';
import { mockSongs } from '@/lib/mock-data';

export default function SongsDashboard() {
    return (
        <div className=" space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Songs</h1>

            <SongForm />
            <div className="mt-6">
                <h2 className="font-semibold mb-3 text-lg text-white">Song List</h2>
                <ul className="space-y-3 text-white">
                    {mockSongs.map((song) => (
                        <li
                            key={song.id}
                            className="bg-black rounded-2xl shadow-md p-4 flex items-center justify-between"
                        >
                            <span className="font-medium">{song.title}</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm rounded-full bg-gray-900 hover:bg-gray-300 transition">
                                    Edit
                                </button>
                                <button className="px-3 py-1 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
