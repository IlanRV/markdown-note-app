import express from "express";

import {
  getNoteApi,
  getStatsApi,
  listNotesApi,
  searchNotesApi,
} from "../controllers/apiController.js";

export function createApiRouter() {
  const router = express.Router();

  router.get("/notes", listNotesApi);
  router.get("/notes/:slug", getNoteApi);
  router.get("/search", searchNotesApi);
  router.get("/stats", getStatsApi);

  return router;
}
