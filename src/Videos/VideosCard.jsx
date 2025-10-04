import { Play } from "lucide-react";

function VideoCard({ video }) {
  return (
    <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md hover:shadow-yellow-500/30 transition-all duration-500 ease-out w-full cursor-pointer group hover:-translate-y-2 relative">
      <div className="relative h-56 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition duration-500">
            <div className="bg-yellow-500 p-4 rounded-full shadow-lg hover:scale-110 transform transition">
              <Play className="w-8 h-8 text-black" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-200 group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
