# AI Video Finder — Architecture & Flow

A visual overview of how the project is structured, how components connect, and how data flows from user input to video results.

---

## High-Level Architecture

```mermaid
graph TB
    subgraph Client ["🖥️ Client (Browser)"]
        A["app/page.tsx<br/><b>Home Page</b><br/>State: search, data"]
        B["components/navigation.tsx<br/><b>Navigation Bar</b><br/>Brand: Relevia + AI badge"]
        C["components/hero.tsx<br/><b>Hero Section</b><br/>Title, subtitle, results grid"]
        D["components/search-bar.tsx<br/><b>Search Input</b><br/>Form with loading state"]
        E["components/gradient-bg.tsx<br/><b>Gradient Background</b><br/>Animated overlay"]
    end

    subgraph Server ["⚙️ Server (Next.js API Routes)"]
        F["app/api/search/route.ts<br/><b>Search API</b><br/>POST /api/search"]
        G["app/api/[transport]/route.ts<br/><b>AI Tools API</b><br/>enhance-search, analyze-relevance"]
    end

    subgraph External ["🌐 External Services"]
        H["YouTube Data API v3<br/>/youtube/v3/search"]
        I["Redis<br/>(Optional session store)"]
        J["Google Gemini 2.0 Flash<br/>Query Refinement AI"]
    end

    A --> B
    A --> E
    E --> C
    C --> D
    D -->|"POST { query }"| F
    F -->|"Refine query"| J
    J -->|"Refined query"| F
    F -->|"fetch with refined query"| H
    H -->|"JSON: items[]"| F
    F -->|"{ items, originalQuery, refinedQuery }"| D
    G -.->|"Available tool"| H
    G -.->|"Session via"| I

    style Client fill:#1e1b4b,stroke:#6366f1,color:#fff
    style Server fill:#3b0764,stroke:#a855f7,color:#fff
    style External fill:#7c2d12,stroke:#f97316,color:#fff
```

---

## User Search Flow (Sequence)

```mermaid
sequenceDiagram
    actor User
    participant Page as app/page.tsx
    participant SearchBar as search-bar.tsx
    participant Hero as hero.tsx
    participant API as /api/search
    participant Gemini as Gemini 2.0 Flash
    participant YouTube as YouTube Data API v3

    User->>SearchBar: Types search query
    SearchBar->>Page: setSearch(query)
    User->>SearchBar: Submits form
    SearchBar->>SearchBar: setIsLoading(true)
    SearchBar->>Page: fetchData()
    Page->>API: POST /api/search { query }
    API->>Gemini: Refine query for YouTube search
    Gemini-->>API: Refined query string
    API->>YouTube: GET /youtube/v3/search?q=refinedQuery
    YouTube-->>API: { items: VideoItem[] }
    API-->>Page: { items, originalQuery, refinedQuery }
    Page->>Page: setData(items), setRefinedQuery()
    Page->>Hero: Passes items + refinedQuery as props
    Hero->>User: Shows AI refined badge + video cards
    SearchBar->>SearchBar: setIsLoading(false)
```

---

## Component Tree

```mermaid
graph TD
    RootLayout["RootLayout<br/><i>app/layout.tsx</i><br/>Poppins font, metadata"]
    Home["Home<br/><i>app/page.tsx</i><br/>Client component<br/>State: search, data"]
    GradientBG["GradientBackground<br/><i>gradient-bg.tsx</i><br/>Animated gradient overlay"]
    Nav["Navigation<br/><i>navigation.tsx</i><br/>Logo + nav links"]
    Hero["HeroSection<br/><i>hero.tsx</i><br/>Title + search + results"]
    SearchBar["ChatInput<br/><i>search-bar.tsx</i><br/>Input + submit button"]
    VideoCard["Video Card<br/><i>Inside hero.tsx</i><br/>Thumbnail + title + channel"]

    RootLayout --> Home
    Home --> GradientBG
    GradientBG --> Nav
    GradientBG --> Hero
    Hero --> SearchBar
    Hero --> VideoCard

    style RootLayout fill:#312e81,stroke:#818cf8,color:#fff
    style Home fill:#312e81,stroke:#818cf8,color:#fff
    style GradientBG fill:#4c1d95,stroke:#a78bfa,color:#fff
    style Nav fill:#4c1d95,stroke:#a78bfa,color:#fff
    style Hero fill:#4c1d95,stroke:#a78bfa,color:#fff
    style SearchBar fill:#6b21a8,stroke:#c084fc,color:#fff
    style VideoCard fill:#6b21a8,stroke:#c084fc,color:#fff
```

---

## AI Tools (MCP Transport Layer)

The `app/api/[transport]/route.ts` exposes two AI-powered tools via the Vercel MCP adapter:

```mermaid
graph LR
    subgraph AI_Tools ["AI Tools — /api/[transport]"]
        T1["🔍 enhance-search<br/>Input: query (string)<br/>Output: enhanced query<br/><i>Appends 'tutorial' keyword</i>"]
        T2["📊 analyze-relevance<br/>Input: video + query<br/>Output: relevance score (0–1)<br/><i>Scores title, description, tags</i>"]
    end

    Client["External AI Client"] -->|"Call tool"| T1
    Client -->|"Call tool"| T2
    T1 -->|"Enhanced query"| Client
    T2 -->|"Score: 0.0–1.0"| Client

    style AI_Tools fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style Client fill:#064e3b,stroke:#34d399,color:#fff
```

### Relevance Scoring Logic

```mermaid
graph TD
    Start["Start: score = 0.5"] --> CheckTitle{"Title contains query?"}
    CheckTitle -->|Yes| AddTitle["score += 0.3"]
    CheckTitle -->|No| CheckDesc
    AddTitle --> CheckDesc{"Description contains query?"}
    CheckDesc -->|Yes| AddDesc["score += 0.1"]
    CheckDesc -->|No| CheckTags
    AddDesc --> CheckTags{"Tags contain query?"}
    CheckTags -->|Yes| AddTags["score += 0.1"]
    CheckTags -->|No| Cap
    AddTags --> Cap["Cap at 1.0"]
    Cap --> Return["Return score"]

    style Start fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style Return fill:#064e3b,stroke:#34d399,color:#fff
```

---

## File Structure Map

```mermaid
graph TD
    Root["📁 Project Root"]
    App["📁 app/"]
    API["📁 api/"]
    Components["📁 components/"]
    UI["📁 ui/"]
    Types["📁 types/"]
    Lib["📁 lib/"]

    Root --> App
    Root --> Components
    Root --> Types
    Root --> Lib

    App --> Layout["layout.tsx — Root layout + metadata"]
    App --> PageFile["page.tsx — Home page (client)"]
    App --> GlobalCSS["globals.css — Global styles"]
    App --> API

    API --> Search["search/route.ts — YouTube search endpoint"]
    API --> Transport["[transport]/route.ts — AI tools endpoint"]

    Components --> NavComp["navigation.tsx — Top nav bar"]
    Components --> HeroComp["hero.tsx — Hero + video grid"]
    Components --> SearchComp["search-bar.tsx — Search input"]
    Components --> GradientComp["gradient-bg.tsx — Background"]
    Components --> UI
    UI --> ButtonComp["button.tsx — Reusable button"]

    Types --> TypesIndex["index.ts — VideoItem, SearchResponse, etc."]
    Lib --> LibUtils["utils.ts — Utility functions"]
    Lib --> LibTypes["types.d.ts — Module declarations"]

    style Root fill:#1e1b4b,stroke:#6366f1,color:#fff
    style App fill:#312e81,stroke:#818cf8,color:#fff
    style API fill:#3b0764,stroke:#a855f7,color:#fff
    style Components fill:#4c1d95,stroke:#a78bfa,color:#fff
    style UI fill:#6b21a8,stroke:#c084fc,color:#fff
    style Types fill:#7c2d12,stroke:#f97316,color:#fff
    style Lib fill:#7c2d12,stroke:#f97316,color:#fff
```

---

## Data Types

```mermaid
classDiagram
    class VideoItem {
        +id.videoId: string
        +snippet.title: string
        +snippet.description: string
        +snippet.thumbnails: Thumbnails
        +snippet.channelTitle: string
        +snippet.publishedAt: string
        +relevanceScore?: number
    }

    class SearchResponse {
        +items: VideoItem[]
        +originalQuery: string
        +enhancedQuery: string
    }

    class HeroSectionProps {
        +items: VideoItem[] | null
        +search: string
        +setSearch(search: string): void
        +fetchData(): Promise~void~
    }

    SearchResponse --> VideoItem : contains
    HeroSectionProps --> VideoItem : displays
```
