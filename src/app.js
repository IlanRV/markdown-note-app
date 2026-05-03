import express from "express";

import { createApiRouter } from "./routes/apiRoutes.js";
import { createPageRouter } from "./routes/pageRoutes.js";
import { createNotFoundPage } from "./utils/templateRenderer.js";

export function createApp() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/", createPageRouter());
  app.use("/api", createApiRouter());

  app.use((req, res) => {
    res.status(404).send(createNotFoundPage(req.originalUrl));
  });

  return app;
}
