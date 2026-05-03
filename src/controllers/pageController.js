import { createNoteService } from "../services/noteService.js";
import {
  renderHomePage,
  renderNotePage,
  renderSearchPage,
  renderStatusPage,
} from "../utils/templateRenderer.js";

const noteService = createNoteService();

export function showHomePage(_req, res) {
  const notesByCategory = noteService.groupNotesByCategory();
  const stats = noteService.getLibraryStats();

  res.send(renderHomePage({ notesByCategory, stats }));
}

export function showNotePage(req, res) {
  const note = noteService.getRenderedNote(req.params.slug);

  if (!note) {
    res.status(404).send(renderStatusPage("Note not found", "The requested note does not exist."));
    return;
  }

  res.send(renderNotePage(note));
}

export function showSearchPage(req, res) {
  const query = String(req.query.q || "");
  const results = noteService.searchNotes(query);

  res.send(renderSearchPage({ query, results }));
}
