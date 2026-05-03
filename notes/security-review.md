# Security Review
Category: Operations
Tags: security, validation, routes

This demo keeps request handling intentionally simple, but it still validates note slugs before loading files. The app only reads files from the configured notes directory and does not accept arbitrary filesystem paths.

## Controls

- Route parameters are checked with `assertSafeSlug`.
- Markdown files are discovered from a fixed directory.
- Unknown pages return a controlled 404 page.
- Search uses existing note summaries instead of raw filesystem lookups.

## Future Improvements

- Add HTML sanitization for untrusted markdown authors.
- Add rate limiting for public deployments.
- Add structured request logging for production observability.
