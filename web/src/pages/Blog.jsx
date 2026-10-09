import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import blogPosts from "../lib/blogPosts";

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>PDF Tips & Guides — DoAide PDF Blog</title>
        <meta
          name="description"
          content="Practical guides and tips for working with PDF files. Learn how to merge, compress, convert, and manage PDFs for free."
        />
        <link rel="canonical" href="https://pdf.doaide.com/blog" />
        <meta property="og:title" content="PDF Tips & Guides — DoAide PDF Blog" />
        <meta property="og:description" content="Practical guides and tips for working with PDF files." />
        <meta property="og:url" content="https://pdf.doaide.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DoAide PDF" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "DoAide PDF Blog",
            "url": "https://pdf.doaide.com/blog",
            "description": "Practical guides and tips for working with PDF files.",
            "publisher": {
              "@type": "Organization",
              "name": "DoAide",
              "url": "https://doaide.com",
            },
          })}
        </script>
      </Helmet>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PDF Tips &{" "}
            <span className="italic text-gold-400">Guides</span>
          </h1>
          <p className="text-lg text-gray-500">
            Practical advice for working with PDF files — free tools, how-to
            guides, and best practices.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-gold-400 transition-all no-underline"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3">{post.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock /> {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
