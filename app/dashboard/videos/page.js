// File: app/dashboard/videos/page.js
import VideoForm from '@/components/forms/VideoForm';
import { mockVideos } from '@/lib/mock-data';

export default function VideosDashboard() {
    return (
        <div className=" space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Videos</h1>

            {/* Video Form */}
            <VideoForm />

            {/* Videos List */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockVideos.map((video) => (
                    <div
                        key={video.id}
                        className="bg-black rounded-2xl shadow-md p-4"
                    >
                        <div className="font-medium">{video.title}</div>
                        <div className="text-gray-500 text-sm">ID: {video.youtube_id}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
