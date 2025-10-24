import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockPosts } from '@/lib/mock-data';

export default function ArticlePage({ params }) {
    const post = mockPosts.find(p => p.slug === params.slug);
    if (!post) notFound();

    return (
        <div className="pt-24 min-h-screen">
            <article className="max-w-3xl mx-auto px-4 py-8 bg-black rounded-xl border border-gray-800 shadow-md">
                {/* الصورة العلوية */}
                {post.cover_url && (
                    <div className="relative mb-6 overflow-hidden rounded-lg">
                        <img
                            src={post.cover_url}
                            alt={post.title}
                            className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                )}

                {/* العنوان */}
                <h1 className="text-3xl font-bold text-gray-200 mb-4">{post.title}</h1>

                {/* تفاصيل الكاتب والتاريخ */}
                <div className="flex justify-between items-center text-gray-500 text-sm mb-6">
                    <span>{post.author || 'Author'}</span>
                    <span>{post.date || '2025-10-01'}</span>
                </div>

                {/* المحتوى */}
                <div
                    className="prose prose-invert text-gray-300"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* زر العودة */}
                <div className="mt-8">
                    <Link
                        href="/news"
                        className="inline-block border border-yellow-500 text-yellow-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 hover:text-black transition"
                    >
                        Back to News
                    </Link>
                </div>
            </article>
        </div>
    );
}
