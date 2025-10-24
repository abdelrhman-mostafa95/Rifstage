"use client";

export default function News() {
    const news = [
        {
            id: 1,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKsTcW84LpPt3aBJJo6ElM624NZKb6a1lBw&s",
            title: "News Title",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            author: "Author Name",
            date: "2025-10-01",
        },
        {
            id: 2,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKsTcW84LpPt3aBJJo6ElM624NZKb6a1lBw&s",
            title: "News Title",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            author: "Author Name",
            date: "2025-10-01",
        },
        {
            id: 3,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvKsTcW84LpPt3aBJJo6ElM624NZKb6a1lBw&s",
            title: "News Title",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            author: "Author Name",
            date: "2025-10-01",
        },
    ];

    // ---- News Card UI ----
    const NewsCard = ({ card }) => (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md hover:shadow-2xl hover:shadow-yellow-500/40 transition-all duration-500 ease-out w-full cursor-pointer group hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    News
                </span>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-200 group-hover:text-yellow-500 transition-colors duration-300">
                    {card.title}
                </h3>

                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {card.description}
                </p>

                <div className="flex justify-between items-center text-gray-500 mt-4 text-xs">
                    <span>{card.author}</span>
                    <span>{card.date}</span>
                </div>

                <div className="mt-4">
                    <button className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 hover:text-black transition">
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-gray-900">
            {/* ---- Header ---- */}
            <div className="m-8 flex justify-between items-center p-4">
                <div>
                    <h1 className="text-white text-xl font-bold">Latest News</h1>
                    <p className="text-gray-400">
                        Stay up to date with the latest news from the music world.
                    </p>
                </div>
                <button className="text-yellow-500 hover:underline">See All</button>
            </div>

            {/* ---- Cards Grid ---- */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {news.map((card) => (
                        <NewsCard key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
