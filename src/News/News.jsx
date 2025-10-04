import AllNewsCards from "./AllNewsCards";

function News() {
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

  return (
    <>
      <section className="mt-12 bg-gray-900">
        <div className="flex justify-between items-center p-4">
          <div>
            <h1 className="text-white text-xl font-bold">Latest News</h1>
            <p className="text-gray-400">
              Stay up to date with the latest news from the music world.
            </p>
          </div>
          <button className="text-yellow-500 hover:underline">See All</button>
        </div>
        <AllNewsCards data={news} />
      </section>
    </>
  );
}

export default News;
