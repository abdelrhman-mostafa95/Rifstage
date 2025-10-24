'use client';
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import Image from 'next/image';
import { usePlayer } from '@/lib/player-store';

export default function PlayerBar() {
    const { queue, currentIndex, next, prev } = usePlayer();
    const track = queue[currentIndex];
    if (!track) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">
            <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
                {track.coverUrl && <Image alt={track.title} src={track.coverUrl} width={48} height={48} className="rounded" />}
                <div className="text-sm">
                    <div className="font-semibold">{track.title}</div>
                    <div className="text-zinc-400">{track.artist}</div>
                </div>
            </div>
            <AudioPlayer
                src={track.audioUrl}
                onEnded={next}
                showJumpControls={false}
                onClickNext={next}
                onClickPrevious={prev}
            />
        </div>
    );
}