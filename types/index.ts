export interface VideoItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
  relevanceScore?: number;
}

export interface SearchResponse {
  items: VideoItem[];
  originalQuery: string;
  enhancedQuery: string;
}

export interface HeroSectionProps {
  items: VideoItem[] | null;
  search: string;
  setSearch: (search: string) => void;
  fetchData: () => Promise<void>;
}
