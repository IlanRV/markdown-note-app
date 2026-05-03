import { join } from "node:path";
import { fileURLToPath } from "node:url";

export function resolveRootPath() {
  return fileURLToPath(new URL("../..", import.meta.url));
}

export function resolveAppPaths() {
  const root = resolveRootPath();

  return {
    root,
    notesDir: join(root, "notes"),
    templatePath: join(root, "template.html"),
  };
}
