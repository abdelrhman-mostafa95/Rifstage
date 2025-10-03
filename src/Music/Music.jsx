import AllMusicCards from "./AllMusicCards";

function Music() {
  const data = [
    {
      image:
        "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
      title: "Song Title",
      artist: "Artist Name",
      duration: "3:45",
    },
    {
      image:
        "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
      title: "Song Title",
      artist: "Artist Name",
      duration: "3:45",
    },
    {
      image:
        "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
      title: "Song Title",
      artist: "Artist Name",
      duration: "3:45",
    },
    {
      image:
        "https://images.squarespace-cdn.com/content/v1/6035144426ec817724dd37bf/1640963848364-83X7LCNZRG3RVTGZD0GT/mehdi+black+wind.jpeg",
      title: "Song Title",
      artist: "Artist Name",
      duration: "3:45",
    },
  ];
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-white text-xl font-bold">Featured Music</h1>
          <p className="text-gray-400">Listen to the best trending songs</p>
        </div>
        <button className="text-yellow-500 hover:underline">See All</button>
      </div>
      <AllMusicCards data={data} />
    </div>
  );
}

export default Music;
