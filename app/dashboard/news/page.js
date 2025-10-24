
import PostForm from '@/components/forms/PostForm';
import { mockPosts } from '@/lib/mock-data';

export default function NewsDashboard() {
    return (
        <div className=" space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-white">News</h1>

            {/* Post Form */}
            <PostForm />

            {/* Posts List */}
            <div className="space-y-3 mt-6">
                {mockPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-black rounded-2xl shadow-md p-2 flex items-center justify-between"
                    >
                        <span className="font-medium text-white">{post.title}</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-300 transition">
                                Edit
                            </button>
                            <button className="px-3 py-1 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
