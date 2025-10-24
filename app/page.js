
import Hero from "@/components/Hero";
import Rules from "@/components/Rules";
import Music from "@/components/Music";
import News from "@/components/News";
import Videos from "@/components/Videos";
import Artist from "@/components/Artist";

export default function Home() {
  return (
    <>
      <Hero />
      <Artist />
      <Music />
      <News />
      <Videos />
      <Rules />
    </>
  );
}
