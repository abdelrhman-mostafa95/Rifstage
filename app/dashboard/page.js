"use client";

import { useEffect, useState } from "react";
import { getVideos, getNews } from "../../lib/supabaseStorage";
import { getSongs } from "@/functions/songs";
import { getPlaylists } from "../../lib/playlist"; // ✅ استيراد دالة playlists

export default function DashboardHome() {
    const [counts, setCounts] = useState({
        songs: 0,
        videos: 0,
        posts: 0,
        playlists: 0, // ✅ إضافة playlist
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCounts();
    }, []);

    const loadCounts = async () => {
        console.log("Loading counts...");

        try {
            const songs = (await getSongs()) || [];
            console.log("Songs loaded:", songs.length);

            const videos = (await getVideos()) || [];
            console.log("Videos loaded:", videos.length);

            const posts = (await getNews()) || [];
            console.log("Posts loaded:", posts.length);

            const playlists = (await getPlaylists()) || [];
            console.log("Playlists loaded:", playlists.length);

            setCounts({
                songs: Array.isArray(songs) ? songs.length : 0,
                videos: Array.isArray(videos) ? videos.length : 0,
                posts: Array.isArray(posts) ? posts.length : 0,
                playlists: Array.isArray(playlists) ? playlists.length : 0,
            });
        } catch (error) {
            console.error("Error loading counts:", error);
        } finally {
            console.log("Finished loading counts");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 text-white text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-black rounded-2xl shadow-md p-6 text-center text-white">
                    <div className="text-gray-500">Songs</div>
                    <div className="text-2xl font-semibold">{counts.songs}</div>
                </div>

                <div className="bg-black rounded-2xl shadow-md p-6 text-center text-white">
                    <div className="text-gray-500">Videos</div>
                    <div className="text-2xl font-semibold">{counts.videos}</div>
                </div>

                <div className="bg-black rounded-2xl shadow-md p-6 text-center text-white">
                    <div className="text-gray-500">Posts</div>
                    <div className="text-2xl font-semibold">{counts.posts}</div>
                </div>

                <div className="bg-black rounded-2xl shadow-md p-6 text-center text-white">
                    <div className="text-gray-500">Playlists</div>
                    <div className="text-2xl font-semibold">{counts.playlists}</div>
                </div>
            </div>
        </div>
    );
}
