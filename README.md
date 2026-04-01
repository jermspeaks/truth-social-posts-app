# Truth Social Archive

A fast, client-side webapp for browsing, searching, and filtering all of Donald Trump's Truth Social posts — powered by CNN's public archive of 32,000+ posts.

## Features

- **Virtual scroll feed** — renders only visible cards, handles 32k posts without breaking a sweat
- **Full-text search** — searches post content with keyword highlighting
- **Sort** — by newest, oldest, most replies, most reblogs, or most likes
- **Date range filter** — custom from/to date picker
- **Term quick-filters** — one-click shortcuts for First Term, Post-Presidency, and Second Term
- **Media display** — inline image grid with a click-to-expand lightbox
- **Engagement stats** — replies, reblogs, and likes on every card
- **Export** — download filtered results as JSON, CSV, or TXT
- **Dark mode** — persisted across sessions
- **Shareable URLs** — all active filters are encoded in the URL

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| URL state | nuqs |
| Virtual scroll | TanStack Virtual |
| HTML sanitization | DOMPurify |
| Date utilities | date-fns |
| Deployment | Netlify |

## Data Source

Posts are fetched at runtime from CNN's public Truth Social archive:

```
https://ix.cnn.io/data/truth-social/truth_archive.json
```

~16.6 MB of JSON, updated daily, CORS-open — no proxy or backend required. All filtering, sorting, and searching happens in-memory in the browser.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app will fetch the full archive on first load (~2–3 seconds on a fast connection).

```bash
# Type-check + production build
npm run build

# Preview the production build locally
npm run preview
```

## Deployment

The app is configured for [Netlify](https://netlify.com) out of the box.

### Connect via Netlify UI

1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
3. Select your GitHub repo
4. Build settings are pre-configured in `netlify.toml` — no changes needed:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

### Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Authenticate
netlify login

# Build and deploy to production
npm run build && netlify deploy --prod --dir=dist
```

The `netlify.toml` includes a catch-all redirect rule (`/* → /index.html`) so that shared filter URLs (e.g. `/?q=covfefe&sort=most_likes`) load correctly instead of returning a 404.

## Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui base components
│   ├── FilterBar.tsx     # Search, sort, and date range controls
│   ├── QuickFilters.tsx  # First Term / Post-Presidency / Second Term shortcuts
│   ├── PostFeed.tsx      # Virtualised post list
│   ├── PostCard.tsx      # Individual post card
│   ├── PostMedia.tsx     # Image grid + lightbox
│   ├── EngagementStats.tsx
│   ├── ExportMenu.tsx
│   ├── ThemeToggle.tsx
│   ├── ResultsCount.tsx
│   ├── LoadingScreen.tsx
│   ├── EmptyState.tsx
│   └── ScrollToTop.tsx
├── hooks/
│   ├── usePosts.ts         # Fetches and caches the JSON archive
│   ├── useUrlFilters.ts    # nuqs-backed filter state (synced to URL)
│   └── useFilteredPosts.ts # Filter → sort pipeline via useMemo
├── lib/
│   ├── sanitize.ts     # DOMPurify wrapper + HTML-to-text helper
│   ├── highlight.ts    # Wraps search matches in <mark> tags
│   ├── dateRanges.ts   # Term date boundaries
│   ├── sortFns.ts      # Comparator functions per sort option
│   ├── export.ts       # JSON / CSV / TXT download helpers
│   └── utils.ts        # shadcn cn() utility
└── types/
    └── post.ts         # Post interface, SortOption, QuickFilter types
```

## Quick Filter Dates

| Filter | Range |
|---|---|
| First Term | Jan 20, 2017 – Jan 20, 2021 |
| Post-Presidency | Jan 20, 2021 – Jan 20, 2025 |
| Second Term | Jan 20, 2025 – present |

Truth Social launched in April 2022, so the Post-Presidency filter only returns posts from that date onward.
