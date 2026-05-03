import { isSafeSlug } from "../utils/slug.js";

export function assertSafeSlug(slug) {
  if (!isSafeSlug(slug)) {
    return "";
  }

  return slug;
}
