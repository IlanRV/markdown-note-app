export function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isSafeSlug(value) {
  return /^[a-z0-9-]+$/.test(String(value || ""));
}
