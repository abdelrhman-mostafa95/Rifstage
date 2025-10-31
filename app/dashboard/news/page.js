"use client";

import { useEffect, useState } from "react";
import PostForm from "@/components/forms/PostForm";
import { getNews, deleteNews } from "../../../lib/supabaseStorage";

export default function NewsDashboard() {
    const [posts, setPosts] = useState([]);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => { const data = await getNews(); setPosts(data); };

    const handleDelete = async (id) => { await deleteNews(id); loadData(); };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">News</h1>
            <PostForm onSuccess={loadData} editItem={editItem} onCancelEdit={() => setEditItem(null)} />
            <div className="space-y-3">
                {posts.map(post => (
                    <div key={post.id} className="bg-black rounded-2xl p-2 flex items-center justify-between">
                        <span className="text-white">{post.title}</span>
                        <div className="flex gap-2">
                            <button onClick={() => setEditItem(post)} className="px-3 py-1 bg-gray-900 text-white rounded-full">Edit</button>
                            <button onClick={() => handleDelete(post.id)} className="px-3 py-1 bg-red-600 text-white rounded-full">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
