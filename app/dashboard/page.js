
import { mockSongs, mockVideos, mockPosts } from '@/lib/mock-data';

export default function DashboardHome() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black rounded-2xl shadow-md p-6 text-center text-white">
                    <div className="text-gray-500">Songs</div>
                    <div className="text-2xl font-semibold">{mockSongs.length}</div>
                </div>
                <div className="bg-black rounded-2xl shadow-md p-6 text-center text-white">
                    <div className="text-gray-500">Videos</div>
                    <div className="text-2xl font-semibold">{mockVideos.length}</div>
                </div>
                <div className="bg-black rounded-2xl shadow-md p-6 text-center text-white">
                    <div className="text-gray-500">Posts</div>
                    <div className="text-2xl font-semibold">{mockPosts.length}</div>
                </div>
            </div>
        </div>
    );
}
