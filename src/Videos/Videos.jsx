import AllVideos from "./AllVideosCards";

function Videos() {
  const videos = [
    {
      id: 1,
      thumbnail: "https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
      title: "Top 10 Music Videos of 2025",
      description: "Watch the hottest tracks of the year in one playlist.",
    },
    {
      id: 2,
      thumbnail:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/12/10/12/hozier2.jpg",
      title: "Live Concert Highlights",
      description: "Experience the energy of live performances.",
    },
    {
      id: 3,
      thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
      title: "Behind the Scenes",
      description: "Exclusive look into music video productions.",
    },
  ];

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-white text-xl font-bold">Latest Videos</h1>
          <p className="text-gray-400">
            Watch the newest videos from your favorite artists.
          </p>
        </div>
        <button className="text-yellow-500 hover:underline">See All</button>
      </div>
      <AllVideos data={videos} />
    </section>
  );
}

export default Videos;
