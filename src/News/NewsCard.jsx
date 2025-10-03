function NewsCard({ card }) {
  return (
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
}

export default NewsCard;
