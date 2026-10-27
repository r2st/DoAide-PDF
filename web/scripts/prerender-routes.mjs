#!/usr/bin/env node
/**
 * prerender-routes.mjs
 *
 * Post-build script that injects per-route <title>, <meta description>,
 * <link canonical>, and Open Graph / Twitter Card tags into the built
 * index.html for every route defined in routeMeta.js.
 *
 * Usage:  node scripts/prerender-routes.mjs
 *
 * For each route the script:
 *   1. Creates the directory structure under dist/
 *   2. Copies the built index.html into it
 *   3. Replaces the generic <title>, description, canonical, og:*, and
 *      twitter:* tags with route-specific values
 *
 * This gives search-engine crawlers correct metadata on the first
 * response, without waiting for client-side JS to hydrate.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = process.argv[2] || join(__dirname, "..", "dist");
const TEMPLATE = readFileSync(join(DIST, "index.html"), "utf-8");
const SITE = "https://pdf.doaide.com";
const OG_IMAGE = `${SITE}/og-image.svg`;

/* ---- dynamic import of routeMeta ---- */
// routeMeta uses ESM imports of tools.js / blogPosts.js which use
// react-icons. We avoid that by reading the tools and blogPosts
// directly and building the meta list here.

// Minimal re-implementation that avoids importing React components:
import { createRequire } from "node:module";

// Parse tools.js to extract SEO data (we only need id, path, seo fields)
function parseToolsSeo() {
  const src = readFileSync(
    join(__dirname, "..", "src", "lib", "tools.js"),
    "utf-8"
  );
  const tools = [];
  const re =
    /path:\s*"([^"]+)"[\s\S]*?seo:\s*\{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*\n?\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    tools.push({ path: m[1], seo: { title: m[2], description: m[3] } });
  }
  return tools;
}

function parseBlogSlugs() {
  const src = readFileSync(
    join(__dirname, "..", "src", "lib", "blogPosts.js"),
    "utf-8"
  );
  const posts = [];
  const re =
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*\n?\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    posts.push({ slug: m[1], title: m[2], description: m[3] });
  }
  return posts;
}

const tools = parseToolsSeo();
const blogPosts = parseBlogSlugs();

const routes = [
  {
    path: "/",
    title: "DoAide PDF — Free Online PDF Tools",
    description:
      "Free online PDF tools — merge, split, compress, convert, rotate, watermark, and more. No login required. 100% free.",
  },
  ...tools.map((t) => ({
    path: t.path,
    title: t.seo.title,
    description: t.seo.description,
  })),
  {
    path: "/blog",
    title: "PDF Tips & Guides — DoAide PDF Blog",
    description:
      "Practical guides and tips for working with PDF files. Learn how to merge, compress, convert, and manage PDFs for free.",
  },
  ...blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} | DoAide PDF`,
    description: p.description,
  })),
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

let written = 0;

for (const route of routes) {
  const canonical = `${SITE}${route.path}`;
  const safeTitle = escapeHtml(route.title);
  const safeDesc = escapeHtml(route.description);

  let html = TEMPLATE;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${safeTitle}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${safeDesc}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${safeDesc}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );

  // Replace twitter:title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );

  // Determine output path
  const outDir =
    route.path === "/"
      ? DIST
      : join(DIST, ...route.path.replace(/^\//, "").split("/"));

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  const outFile = join(outDir, "index.html");

  // Skip overwriting the root index.html if the route is "/" —
  // it is already the template. For "/" we still want the replacements.
  writeFileSync(outFile, html, "utf-8");
  written++;
}

console.log(`prerender-routes: wrote ${written} route(s) under ${DIST}`);
