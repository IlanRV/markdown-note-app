import express from "express";
import { marked } from "marked";
import { readFileSync, readdirSync } from "node:fs";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const NOTES_DIR = join(__dirname, "notes");
const TEMPLATE_PATH = join(__dirname, "template.html");
const PORT = process.env.PORT || 4000;

const app = express();

// --------------- Helpers ---------------

/** Read the HTML template and inject content + optional extras into it. */
function render(title, bodyHtml) {
  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  return template
    .replace("{{title}}", title)
    .replace('<div id="content"></div>', `<div id="content">${bodyHtml}</div>`);
}

/** Return a list of .md filenames in the notes folder. */
function listNotes() {
  return readdirSync(NOTES_DIR).filter((f) => extname(f) === ".md");
}

// --------------- Routes ---------------

// Home — list all available notes
app.get("/", (_req, res) => {
  const files = listNotes();
  const items = files
    .map((f) => {
      const slug = basename(f, ".md");
      return `<li><a href="/note/${slug}">${slug}</a></li>`;
    })
    .join("\n");

  const html = render(
    "Markdown Note App",
    `<h1>📒 Notes</h1><ul>${items}</ul>`
  );
  res.send(html);
});

// View a single note rendered as HTML
app.get("/note/:slug", (req, res) => {
  const file = `${req.params.slug}.md`;
  const filePath = join(NOTES_DIR, file);

  try {
    const md = readFileSync(filePath, "utf-8");
    const rendered = marked(md);
    const html = render(req.params.slug, `<a href="/">← back</a>${rendered}`);
    res.send(html);
  } catch {
    res.status(404).send(render("Not Found", "<h1>404</h1><p>Note not found.</p><a href='/'>← back</a>"));
  }
});

// --------------- Start ---------------

app.listen(PORT, () => {
  console.log(`Markdown Note App running on http://localhost:${PORT}`);
});
