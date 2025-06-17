'use client'
import GradientBackground from "@/components/gradient-bg";
import HeroSection from "@/components/hero";
import Navigation from "@/components/navigation";
import { useState } from "react";
export default function Home() {
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState([]);

    // data calling from api
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const type = "video";
    const URL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${search}&part=snippet&maxResults=10&type=${type}&videoDuration=medium`

    const fetchData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setData(data.items);
    }

  return (
    <GradientBackground>
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection fetchData={fetchData} items={data} search={search} setSearch={setSearch} />
    </div>
  </GradientBackground> 
  );
}
