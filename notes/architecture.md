# Application Architecture
Category: Engineering
Tags: architecture, express, rendering

The markdown note app is intentionally split into small JavaScript modules so tools can understand its structure. Routes point to controllers, controllers call services, services coordinate repositories, and utilities keep rendering and search logic isolated.

## Runtime Flow

1. `index.js` starts the server.
2. `src/app.js` mounts page and API routers.
3. `pageController` renders HTML views for browser users.
4. `apiController` returns JSON for integrations.
5. `NoteService` loads markdown, extracts metadata, renders HTML, and builds search results.

## Why It Exists

The project gives DevHub a compact frontend-style server-rendered app with enough modules, functions, classes, and markdown content to produce a detailed AI README.
