'use client'
import GradientBackground from "@/components/gradient-bg";
import HeroSection from "@/components/hero";
import Navigation from "@/components/navigation";
import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState([]);
    const [refinedQuery, setRefinedQuery] = useState<string>("");

    const fetchData = async () => {
        const response = await fetch("/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: search }),
        });
        const result = await response.json();
        setData(result.items ?? []);
        setRefinedQuery(result.refinedQuery ?? "");
    };

  return (
    <GradientBackground>
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection fetchData={fetchData} items={data} search={search} setSearch={setSearch} refinedQuery={refinedQuery} />
    </div>
  </GradientBackground> 
  );
}
