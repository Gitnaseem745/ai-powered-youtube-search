# AI Video Finder

> Your AI-Powered Portal to the Right YouTube Video

Stop scrolling through endless results. **AI Video Finder** uses intelligent search enhancement and relevance scoring to surface the YouTube videos that actually match what you're looking for.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![YouTube API](https://img.shields.io/badge/YouTube_API-FF0000?logo=youtube&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?logo=google&logoColor=white)

## Features

- **Gemini AI Query Refinement** — Your search query is intelligently rewritten by Google's Gemini model before hitting YouTube, so you get the most relevant results possible
- **Instant YouTube Search** — Search across YouTube and get results in real-time
- **AI-Refined Badge** — See exactly how AI improved your search query
- **Modern UI** — Responsive gradient interface with smooth animations and loading states
- **Video Cards** — Thumbnails, titles, and channel info displayed in a clean grid layout

## How It Works

1. User types a search query in the search bar
2. Query is sent to the `/api/search` endpoint
3. **Gemini AI** refines the query for optimal YouTube search results
4. The refined query is used to fetch results from the **YouTube Data API v3**
5. Results are returned with the AI-refined query shown as a badge above results
6. AI tools (enhance-search, analyze-relevance) are also available via the transport API

> For a detailed visual breakdown of the architecture and data flow, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- A **YouTube Data API v3** key ([get one here](https://console.cloud.google.com/apis/library/youtube.googleapis.com))
- A **Google Gemini API** key ([get one here](https://aistudio.google.com/apikey))
- (Optional) **Redis URL** for AI tools session persistence

### Installation

```bash
# Clone the repo
git clone https://github.com/Gitnaseem745/ai-powered-youtube-search.git
cd ai-powered-youtube-search

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
GEMINI_KEY=your_gemini_api_key_here
REDIS_URL=your_redis_url_here        # Optional — for AI tools session store
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start searching.

## Project Structure

```
app/
  layout.tsx          # Root layout — Poppins font, metadata
  page.tsx            # Home page — search state, data fetching
  globals.css         # Global styles
  api/
    search/route.ts   # POST /api/search — Gemini AI refinement + YouTube search
components/
  navigation.tsx      # Top navigation bar with Relevia branding
  hero.tsx            # Hero section + video results grid
  search-bar.tsx      # Search input form with loading state
  gradient-bg.tsx     # Animated gradient background wrapper
  ui/button.tsx       # Reusable button component
types/
  index.ts            # TypeScript interfaces (VideoItem, SearchResponse, etc.)
lib/
  utils.ts            # Utility functions
  types.d.ts          # Module type declarations
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Font | Poppins (via next/font) |
| API | YouTube Data API v3 |
| AI | Google Gemini 2.0 Flash |
| Icons | Lucide React |

## Deployment

Deploy instantly on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gitnaseem745/ai-powered-youtube-search)

Or deploy manually:

```bash
npm run build
npm start
```

Make sure to set your environment variables in your hosting platform's dashboard.

## License

This project is open source. Feel free to use, modify, and distribute.

---

Built with purpose — because finding the right video shouldn't be hard.
