
import { mockPosts } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';

export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">الأخبار</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockPosts.map((p) => <ArticleCard key={p.id} post={p} />)}
            </div>
        </div>
    );
}