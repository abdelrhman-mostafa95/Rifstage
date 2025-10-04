import NewsCard from "./NewsCard";

function AllNewsCards({ data }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data.map((card) => (
          <NewsCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default AllNewsCards;
