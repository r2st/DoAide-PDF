/**
 * Static route metadata for SEO prerendering.
 * Maps each route to its title, description, and canonical URL
 * so the prerender script can inject them into the HTML shell
 * before search-engine crawlers see the page.
 */
import tools from "./tools.js";
import blogPosts from "./blogPosts.js";

const SITE = "https://pdf.doaide.com";

const routeMeta = [
  {
    path: "/",
    title: "DoAide PDF — Free Online PDF Tools",
    description:
      "Free online PDF tools — merge, split, compress, convert, rotate, watermark, and more. No login required. 100% free.",
    canonical: `${SITE}/`,
  },
  ...tools.map((t) => ({
    path: t.path,
    title: t.seo.title,
    description: t.seo.description,
    canonical: `${SITE}${t.path}`,
  })),
  {
    path: "/blog",
    title: "PDF Tips & Guides — DoAide PDF Blog",
    description:
      "Practical guides and tips for working with PDF files. Learn how to merge, compress, convert, and manage PDFs for free.",
    canonical: `${SITE}/blog`,
  },
  ...blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} | DoAide PDF`,
    description: p.description,
    canonical: `${SITE}/blog/${p.slug}`,
  })),
];

export default routeMeta;
