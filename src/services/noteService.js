import { marked } from "marked";

import { createFileNoteRepository } from "../repositories/fileNoteRepository.js";
import { extractNoteMetadata, summarizeMarkdown } from "../utils/markdownSummary.js";
import { scoreSearchResult } from "../utils/search.js";
import { assertSafeSlug } from "../validators/noteValidator.js";

export class NoteService {
  constructor(repository = createFileNoteRepository()) {
    this.repository = repository;
  }

  listNoteSummaries() {
    return this.repository.findAll().map((note) => this.buildSummary(note));
  }

  getRenderedNote(slug) {
    const safeSlug = assertSafeSlug(slug);
    const note = this.repository.findBySlug(safeSlug);

    if (!note) {
      return null;
    }

    const summary = this.buildSummary(note);

    return {
      ...summary,
      markdown: note.markdown,
      html: marked(note.markdown),
    };
  }

  searchNotes(query) {
    const normalizedQuery = String(query || "").trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return this.listNoteSummaries()
      .map((note) => ({
        ...note,
        score: scoreSearchResult(note, normalizedQuery),
      }))
      .filter((note) => note.score > 0)
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title));
  }

  groupNotesByCategory() {
    return this.listNoteSummaries().reduce((groups, note) => {
      const category = note.category || "General";
      groups[category] = groups[category] || [];
      groups[category].push(note);
      return groups;
    }, {});
  }

  getLibraryStats() {
    const notes = this.listNoteSummaries();
    const categories = new Set(notes.map((note) => note.category));
    const tags = new Set(notes.flatMap((note) => note.tags));

    return {
      noteCount: notes.length,
      categoryCount: categories.size,
      tagCount: tags.size,
      recentNotes: notes.slice(0, 3),
    };
  }

  buildSummary(note) {
    const metadata = extractNoteMetadata(note.markdown);

    return {
      slug: note.slug,
      title: metadata.title || note.title,
      category: metadata.category || "General",
      tags: metadata.tags,
      excerpt: summarizeMarkdown(note.markdown),
      updatedAt: note.updatedAt,
    };
  }
}

export function createNoteService() {
  return new NoteService();
}
