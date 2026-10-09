import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import ShareButtons from "../components/ShareButtons";
import blogPosts from "../lib/blogPosts";
import tools from "../lib/tools";

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug]
  );

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Post not found
        </h2>
        <Link to="/blog" className="text-gold-500 hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  const relatedTools = (post.relatedTools || [])
    .map((path) => tools.find((t) => t.path === path))
    .filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{post.title} | DoAide PDF</title>
        <meta name="description" content={post.description} />
        <link
          rel="canonical"
          href={`https://pdf.doaide.com/blog/${post.slug}`}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta
          property="og:url"
          content={`https://pdf.doaide.com/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DoAide PDF" />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "DoAide",
            },
            publisher: {
              "@type": "Organization",
              name: "DoAide",
              url: "https://doaide.com",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://pdf.doaide.com/blog/${post.slug}`,
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://pdf.doaide.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://pdf.doaide.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://pdf.doaide.com/blog/${post.slug}`,
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-gray-600 no-underline text-gray-400">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-gray-600 no-underline text-gray-400">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{post.title}</span>
        </nav>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 no-underline"
        >
          <FaArrowLeft /> All Posts
        </Link>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <FaClock /> {post.readTime}
            </span>
            <span>By {post.author}</span>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {relatedTools.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Related Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-4 hover:border-gold-400 hover:shadow transition-all no-underline"
                  >
                    <div
                      className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {tool.name}
                      </p>
                      <p className="text-xs text-gray-400">Free &mdash; No login</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <ShareButtons toolName={post.title} />
      </div>
    </>
  );
}
