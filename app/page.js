
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
      console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log('KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      <Artist />
      <Music />
      <News />
      <Videos />
      <Rules />
    </>
  );
}
