export default function TopSongsSection({ songs, onSongSelect, currentSongIndex }) {
    if (songs.length === 0)
        return <p className="text-gray-400">There are no songs yet</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4"></h2>
            <div className="space-y-3">
                {songs.map((song, index) => (
                    <div
                        key={song.id}
                        onClick={() => onSongSelect(index)}
                        className={`bg-zinc-900 rounded-xl p-4 flex justify-between items-center border border-zinc-800 hover:bg-zinc-800 transition cursor-pointer ${currentSongIndex === index ? "ring-2 ring-red-600" : ""
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {song.cover_url && (
                                <img
                                    src={song.cover_url}
                                    alt={song.title}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                            )}
                            <div>
                                <h3 className="font-medium">{song.title}</h3>
                                <p className="text-gray-400 text-sm">{song.artist}</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{song.duration || "—"}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
