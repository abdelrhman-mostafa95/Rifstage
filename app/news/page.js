"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNews } from "../../lib/supabaseStorage";
import { motion } from "framer-motion";

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const data = await getNews();
            setNews(data);
        } catch (error) {
            console.error("Error loading news:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🌀 Loading UI
    if (loading) {
        return (
            <section className="min-h-screen bg-black flex flex-col justify-center items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                    className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"
                ></motion.div>

                <h2 className="text-yellow-500 text-xl font-semibold mt-6 tracking-wide">
                    Loading News...
                </h2>
            </section>
        );
    }

    // ✅ Main Page
    return (
        <div className="px-8 pt-24 pb-16 min-h-screen text-white bg-black">
            <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide">
                Latest <span className="text-yellow-400">News</span>
            </h1>

            {news.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">
                    No news available at the moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {news.map((post) => (
                        <Link
                            href={`/news/${post.slug}`}
                            key={post.id}
                            className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:shadow-yellow-500/30 transition-all duration-500 hover:-translate-y-3"
                        >
                            {/* Cover Image */}
                            {post.cover_image_url && (
                                <div className="relative h-56 w-full overflow-hidden">
                                    <div
                                        className="h-full w-full bg-cover bg-center transform group-hover:scale-110 transition-all duration-700"
                                        style={{
                                            backgroundImage: `url(${post.cover_image_url})`,
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                </div>
                            )}

                            {/* Info */}
                            <div className="p-5 space-y-3">
                                <h2 className="text-2xl font-bold group-hover:text-yellow-400 transition">
                                    {post.title}
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </p>

                                <p className="text-gray-300 line-clamp-2">{post.content}</p>

                                <button className="mt-2 px-4 py-2 rounded-full text-sm font-medium bg-yellow-500 text-black group-hover:bg-yellow-400 transition">
                                    Read More →
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
