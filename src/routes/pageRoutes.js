import express from "express";

import {
  showHomePage,
  showNotePage,
  showSearchPage,
} from "../controllers/pageController.js";

export function createPageRouter() {
  const router = express.Router();

  router.get("/", showHomePage);
  router.get("/note/:slug", showNotePage);
  router.get("/search", showSearchPage);

  return router;
}
