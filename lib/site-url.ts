/**
 * Canonical origin of the deployed site, used for absolute URLs in metadata,
 * the sitemap, robots.txt and social-preview images.
 *
 * Set NEXT_PUBLIC_SITE_URL in the hosting provider (e.g. https://enochenebeli.dev)
 * once a domain exists. Until then links resolve against localhost, which is
 * correct for local builds and obviously wrong anywhere else.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
