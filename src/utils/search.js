export function scoreSearchResult(note, query) {
  let score = 0;
  const title = note.title.toLowerCase();
  const category = note.category.toLowerCase();
  const excerpt = note.excerpt.toLowerCase();
  const tags = note.tags.map((tag) => tag.toLowerCase());

  if (title.includes(query)) {
    score += 8;
  }

  if (category.includes(query)) {
    score += 4;
  }

  if (tags.some((tag) => tag.includes(query))) {
    score += 5;
  }

  if (excerpt.includes(query)) {
    score += 2;
  }

  return score;
}
