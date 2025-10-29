"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { ArrowLeft } from "lucide-react";

export default function NewsDetailsPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        loadPost();
    }, [slug]);

    const loadPost = async () => {
        try {
            const { data, error } = await supabase
                .from("news")
                .select("*")
                .eq("slug", slug)
                .limit(1)
                .single();

            if (error) throw error;
            setPost(data);
        } catch (err) {
            console.error("❌ Error loading post:", err);
        } finally {
            setLoading(false);
        }
    };

    const isArabic = (text) => /[\u0600-\u06FF]/.test(text);

    /* ==========================
       🌀 Loading Screen
    ========================== */
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-300 text-lg animate-pulse">
                        Loading news details...
                    </p>
                </div>
            </div>
        );
    }

    /* ==========================
       ⚠️ Post Not Found
    ========================== */
    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="text-center text-gray-300">
                    <h2 className="text-2xl font-semibold mb-2">Post Not Found</h2>
                    <p className="mb-6">The news you’re looking for doesn’t exist.</p>
                    <button
                        onClick={() => router.push("/news")}
                        className="px-4 py-2 rounded-full bg-yellow-500 text-black font-medium hover:bg-yellow-400 transition"
                    >
                        Back to News
                    </button>
                </div>
            </div>
        );
    }

    const direction = isArabic(post.content) ? "rtl" : "ltr";
    const align = isArabic(post.content) ? "text-right" : "text-left";

    /* ==========================
       📰 News Details
    ========================== */
    return (
        <div className="min-h-screen text-white bg-black">
            {/* ===== صورة الغلاف ===== */}
            {post.cover_image_url && (
                <div className="relative w-full h-[90vh] md:h-[100vh] overflow-hidden">
                    <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                    {/* ===== العنوان فوق الصورة ===== */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full px-6 md:px-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1
                                className={`text-4xl md:text-6xl font-extrabold mb-4 leading-snug ${align}`}
                                dir={direction}
                            >
                                {post.title}
                            </h1>
                            <p className="text-gray-300 text-sm">
                                🗓 {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* ===== زر الرجوع ===== */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full transition"
                    >
                        <ArrowLeft size={22} />
                    </button>
                </div>
            )}

            {/* ===== المحتوى ===== */}
            <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
                <div
                    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl leading-8 text-gray-200 whitespace-pre-line ${align}`}
                    dir={direction}
                >
                    {post.content}
                </div>
            </div>
        </div>
    );
}
