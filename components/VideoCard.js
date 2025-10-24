
export default function VideoCard({ video }) {
    return (
        <div className="bg-zinc-900 rounded-lg p-3">
            <img
                src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                className="w-full h-40 object-cover rounded"
                alt={video.title}
            />
            <div className="mt-2 font-semibold">{video.title}</div>
        </div>
    );
}