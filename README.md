# Ijebu-Igbo Development (IID)

The official website for Ijebu-Igbo Development — a community and heritage
platform for the Ijebu-Igbo people, covering the town's history, royal
lineages, culture, tourism, news, and community initiatives.

## About the project

The site brings together:

- **Quarters / kingdoms** — dedicated pages for each of the town's royal
  quarters (Atikori, Aparaki, Imope-Ijebu, Japara, Ojowo, Oke-Agbo,
  Oke-Sopen), including history, oriki, councils, and photo galleries.
- **Heritage & tourism** — history, landmarks, travel guide, and a video
  archive.
- **Community** — team, members, events, announcements, scholarships, and a
  local business directory.
- **News & blog** — news is CMS-backed via Sanity; the blog is a static,
  independently maintained SEO content set.
- **Support** — donation and "join" pages for community involvement.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/) + TypeScript
- [shadcn-ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- [Sanity](https://www.sanity.io/) (headless CMS for the News section)

## Getting started

Requires Node.js & npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
# Install dependencies
npm i

# Copy env vars and fill in your Sanity project details
cp .env.example .env

# Start the dev server
npm run dev
```

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build (also generates per-page OG/meta HTML)
- `npm run build:dev` — development-mode build
- `npm run preview` — preview a production build locally
- `npm run lint` — run ESLint
- `npm test` — run the test suite (Vitest)

## Deployment

The build output is a static SPA. `public/.htaccess` is included for
Apache-based shared hosting: it falls back client-side routes to
`index.html` and sets caching/compression for static assets.
