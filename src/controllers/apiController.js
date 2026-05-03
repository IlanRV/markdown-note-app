import { createNoteService } from "../services/noteService.js";

const noteService = createNoteService();

export function listNotesApi(_req, res) {
  const notes = noteService.listNoteSummaries();

  res.json({ success: true, count: notes.length, data: notes });
}

export function getNoteApi(req, res) {
  const note = noteService.getRenderedNote(req.params.slug);

  if (!note) {
    res.status(404).json({ success: false, error: "Note not found" });
    return;
  }

  res.json({ success: true, data: note });
}

export function searchNotesApi(req, res) {
  const query = String(req.query.q || "");
  const results = noteService.searchNotes(query);

  res.json({ success: true, query, count: results.length, data: results });
}

export function getStatsApi(_req, res) {
  res.json({ success: true, data: noteService.getLibraryStats() });
}
