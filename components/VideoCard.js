export default function VideoCard({ video }) {
    return (
        <div className="bg-zinc-900 rounded-2xl p-4 shadow-md hover:scale-105 transition transform duration-300">
            <img
                src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                className="w-full h-52 md:h-64 object-cover rounded-xl"
                alt={video.title}
            />
            <div className="mt-3 font-semibold text-lg md:text-xl text-white">{video.title}</div>
        </div>
    );
}
