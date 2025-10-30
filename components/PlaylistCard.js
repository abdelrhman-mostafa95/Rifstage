"use client";

export default function PlaylistCard({ playlist, onEdit, onDelete }) {
    return (
        <div className="bg-black rounded-2xl shadow-md p-3 flex items-center justify-between border border-gray-800">
            <div className="flex items-center gap-3">
                {playlist.cover_url && (
                    <img
                        src={playlist.cover_url}
                        alt={playlist.name}
                        className="w-12 h-12 rounded-xl object-cover"
                    />
                )}
                <div>
                    <p className="font-medium text-white">{playlist.name}</p>
                    <p className="text-gray-400 text-sm">{playlist.description}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onEdit}
                    className="px-3 py-1 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-700 transition"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="px-3 py-1 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
