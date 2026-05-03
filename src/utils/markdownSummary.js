export function extractNoteMetadata(markdown) {
  const lines = markdown.split("\n");
  const title = lines.find((line) => line.startsWith("# "))?.replace(/^#\s+/, "").trim();
  const categoryLine = lines.find((line) => /^Category:/i.test(line));
  const tagsLine = lines.find((line) => /^Tags:/i.test(line));

  return {
    title,
    category: categoryLine?.replace(/^Category:\s*/i, "").trim(),
    tags: parseTags(tagsLine),
  };
}

export function parseTags(tagsLine) {
  if (!tagsLine) {
    return [];
  }

  return tagsLine
    .replace(/^Tags:\s*/i, "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function summarizeMarkdown(markdown) {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .find((block) => {
      const trimmed = block.trim();
      return trimmed && !trimmed.startsWith("#") && !/^Tags:/i.test(trimmed) && !/^Category:/i.test(trimmed);
    });

  return paragraph?.replace(/\s+/g, " ").slice(0, 180) || "No summary available.";
}
