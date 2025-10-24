
import SongCard from '@/components/SongCard';
import { mockSongs } from '@/lib/mock-data';

export default function MusicPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">الموسيقى</h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {mockSongs.map((s) => (
                    <SongCard key={s.id} song={s} />
                ))}
            </div>

        </div>
    );
}
