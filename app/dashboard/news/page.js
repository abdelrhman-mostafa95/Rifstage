"use client";

import { useEffect, useState } from "react";
import PostForm from "@/components/forms/PostForm";
import { getNews, deleteNews } from "../../../lib/supabaseStorage";

export default function NewsDashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getNews();
        setPosts(data);
    };

    const handleDelete = async (id) => {
        await deleteNews(id);
        loadData();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">News</h1>

            {/* Post Form */}
            <PostForm onSuccess={loadData} />

            {/* Posts List */}
            <div className="space-y-3 mt-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-black rounded-2xl shadow-md p-2 flex items-center justify-between"
                    >
                        <span className="font-medium text-white">{post.title}</span>

                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-300 transition">
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="px-3 py-1 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
