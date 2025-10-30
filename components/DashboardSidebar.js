'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
    const pathname = usePathname();
    const root = '/dashboard';

    const Item = ({ href, label }) => (
        <Link
            className={`block px-3 py-2 rounded transition ${pathname === href
                ? 'bg-yellow-500 text-black font-semibold'
                : 'hover:bg-zinc-800 text-white'
                }`}
            href={href}
        >
            {label}
        </Link>
    );

    return (
        <div className="bg-zinc-900 rounded-lg p-3 text-white">
            <div className="font-bold mb-3 text-lg">Dashboard</div>

            <Item href={`${root}`} label="General" />
            <Item href={`${root}/songs`} label="Songs" />
            <Item href={`${root}/videos`} label="Videos" />
            <Item href={`${root}/news`} label="News" />
            <Item href={`${root}/playlists`} label="Playlists" />
        </div>
    );
}
