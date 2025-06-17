import { Button } from "@/components/ui/button";
import { HeroSectionProps } from "@/types";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ search, setSearch, fetchData }: HeroSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search?.trim()) return;

    try {
      setIsLoading(true);
      await fetchData();
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 max-md:p-3 max-sm:p-2 shadow-2xl">
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for videos..."
                className="w-full bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                disabled={isLoading}
              />
            </div>
            
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-white p-2 rounded-lg"
              disabled={!search?.trim() || isLoading}
            >
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <svg 
                    className="w-4 h-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                )}
              </div>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
