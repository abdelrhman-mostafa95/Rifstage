// File: app/videos/page.js
// app/videos/page.js
import { mockVideos } from '@/lib/mock-data';
import VideoEmbed from '@/components/VideoEmbed';

export default function VideosPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">الفيديوهات</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockVideos.map(v => (
                    <VideoEmbed key={v.id} youtubeId={v.youtube_id} />
                ))}
            </div>
        </div>
    );
}