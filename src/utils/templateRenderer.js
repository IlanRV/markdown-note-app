import { readFileSync } from "node:fs";

import { resolveAppPaths } from "../config/paths.js";

function loadTemplate() {
  return readFileSync(resolveAppPaths().templatePath, "utf-8");
}

function renderLayout(title, bodyHtml) {
  return loadTemplate()
    .replaceAll("{{title}}", title)
    .replace('<div id="content"></div>', `<div id="content">${bodyHtml}</div>`);
}

function renderNoteList(notes) {
  return notes
    .map((note) => {
      const tags = note.tags.map((tag) => `<span class="pill">${tag}</span>`).join("");
      return `<article class="note-card">
        <a href="/note/${note.slug}"><h3>${note.title}</h3></a>
        <p>${note.excerpt}</p>
        <div class="meta">${tags}<span>${new Date(note.updatedAt).toLocaleDateString()}</span></div>
      </article>`;
    })
    .join("");
}

export function renderHomePage({ notesByCategory, stats }) {
  const sections = Object.entries(notesByCategory)
    .map(([category, notes]) => {
      return `<section>
        <h2>${category}</h2>
        <div class="grid">${renderNoteList(notes)}</div>
      </section>`;
    })
    .join("");

  return renderLayout(
    "Markdown Note App",
    `<header>
      <h1>Markdown Note App</h1>
      <p>A tiny knowledge base with ${stats.noteCount} notes, ${stats.categoryCount} categories, and ${stats.tagCount} tags.</p>
      <form action="/search" method="get"><input name="q" placeholder="Search notes" /><button>Search</button></form>
    </header>${sections}`
  );
}

export function renderNotePage(note) {
  return renderLayout(
    note.title,
    `<nav><a href="/">Back to notes</a></nav><article class="markdown">${note.html}</article>`
  );
}

export function renderSearchPage({ query, results }) {
  return renderLayout(
    "Search",
    `<nav><a href="/">Back to notes</a></nav>
    <h1>Search results</h1>
    <p>${results.length} result(s) for <strong>${query || "empty query"}</strong>.</p>
    <div class="grid">${renderNoteList(results)}</div>`
  );
}

export function renderStatusPage(title, message) {
  return renderLayout(title, `<nav><a href="/">Back to notes</a></nav><h1>${title}</h1><p>${message}</p>`);
}

export function createNotFoundPage(path) {
  return renderStatusPage("Page not found", `No page exists at ${path}.`);
}
