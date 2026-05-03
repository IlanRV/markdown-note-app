import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";

import { resolveAppPaths } from "../config/paths.js";
import { toSlug } from "../utils/slug.js";

export class FileNoteRepository {
  constructor(paths = resolveAppPaths()) {
    this.notesDir = paths.notesDir;
  }

  findAll() {
    return readdirSync(this.notesDir)
      .filter((fileName) => extname(fileName) === ".md")
      .map((fileName) => this.readNoteFile(fileName))
      .sort((left, right) => left.title.localeCompare(right.title));
  }

  findBySlug(slug) {
    return this.findAll().find((note) => note.slug === slug) || null;
  }

  readNoteFile(fileName) {
    const filePath = join(this.notesDir, fileName);
    const markdown = readFileSync(filePath, "utf-8");
    const stat = statSync(filePath);

    return {
      slug: toSlug(basename(fileName, ".md")),
      title: basename(fileName, ".md"),
      fileName,
      markdown,
      updatedAt: stat.mtime.toISOString(),
    };
  }
}

export function createFileNoteRepository() {
  return new FileNoteRepository();
}
