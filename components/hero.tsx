import Link from "next/link";
import ChatInput from "./search-bar";
import { HeroSectionProps } from "@/types";

const HeroSection = ({ items, search, setSearch, fetchData, refinedQuery }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 pb-12 px-4">
      <div className="w-full max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight">
          Your AI-Powered Portal to the Right YouTube Video
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 font-normal max-w-xl mx-auto leading-relaxed">
            Your AI assistant for instantly relevant YouTube videos.
          </p>
        </div>
        
        <div className="w-full max-w-2xl mx-auto">
          <ChatInput fetchData={fetchData} search={search} setSearch={setSearch} />
        </div>

        {/* AI Refined Query Badge */}
        {refinedQuery && refinedQuery !== search && (
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-white/60 text-sm">AI searched for:</span>
              <span className="text-white font-medium text-sm">&quot;{refinedQuery}&quot;</span>
            </div>
          </div>
        )}

        {/* List of Videos */}
        {items && items.length > 0 && (
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-8 text-white text-center">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: any, index: number) => (
                <Link 
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`} 
                  target="_blank" 
                  key={index} 
                  className="group bg-white/10 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-white/20"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url} 
                      alt={item.snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                      {item.snippet.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {item.snippet.channelTitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
