"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNews } from "../../../lib/supabaseStorage";

export default function NewsDetailsPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        loadPost();
    }, []);

    const loadPost = async () => {
        const data = await getNews();
        const foundPost = data.find((item) => item.slug === slug);
        setPost(foundPost);
    };

    if (!post) {
        return <div className="text-center text-white p-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-50 text-white">

            {/* ✅ Hero Image with Overlay */}
            {post.cover_image_url && (
                <div className="relative w-full h-[380px] md:h-[450px] overflow-hidden">
                    <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>
            )}

            {/* ✅ Title + Date */}
            <div className="max-w-4xl mx-auto px-6 md:px-10 -mt-24 mb-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
                        {post.title}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        🗓 {new Date(post.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* ✅ Content */}
            <div className="max-w-4xl mx-auto px-6 md:px-10 pb-20">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl leading-8 text-gray-200 whitespace-pre-line">
                    {post.content}
                </div>
            </div>
        </div>
    );
}
