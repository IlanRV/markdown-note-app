# Markdown Note App

Markdown Note App is a JavaScript-only frontend demo for DevHub extraction. It serves a small knowledge base from local markdown files, renders note pages, exposes JSON APIs, and provides search and statistics helpers without a database.

## Architecture

- `index.js` starts the HTTP server.
- `src/app.js` creates the Express app and mounts page/API routes.
- `src/routes` separates browser pages from JSON endpoints.
- `src/controllers` handles HTML pages, API responses, and search requests.
- `src/services/noteService.js` coordinates note listing, rendering, search, and metrics.
- `src/repositories/fileNoteRepository.js` reads markdown files from disk.
- `src/utils` contains slug safety, template rendering, markdown summarization, and search scoring.
- `notes` contains demo markdown content for onboarding, release planning, and product notes.

## Routes

- `GET /` shows all notes grouped by category.
- `GET /note/:slug` renders one markdown note as HTML.
- `GET /search?q=term` renders search results.
- `GET /api/notes` returns note metadata as JSON.
- `GET /api/notes/:slug` returns one note with markdown and HTML.
- `GET /api/search?q=term` returns scored search results.
- `GET /api/stats` returns note count, category count, tag count, and recent notes.

## Demo Goals

This repository intentionally includes route files, controller functions, service classes, repository classes, utility functions, markdown content, and package metadata so DevHub can generate a detailed AI README.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:4000`.
