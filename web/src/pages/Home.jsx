import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import tools from "../lib/tools";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>DoAide PDF — Free Online PDF Tools</title>
        <meta
          name="description"
          content="Free online PDF tools — merge, split, compress, convert, rotate, watermark, and more. No login required. 100% free."
        />
        <link rel="canonical" href="https://pdf.doaide.com/" />
        <meta property="og:title" content="DoAide PDF — Free Online PDF Tools" />
        <meta
          property="og:description"
          content="Free online PDF tools — merge, split, compress, convert, rotate, watermark, and more. No login required."
        />
        <meta property="og:url" content="https://pdf.doaide.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DoAide PDF" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DoAide PDF",
            url: "https://pdf.doaide.com",
            description:
              "Free online PDF tools — merge, split, compress, convert, rotate, watermark, and more. No login required.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            creator: {
              "@type": "Organization",
              name: "DoAide",
              url: "https://doaide.com",
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
            ],
          })}
        </script>
      </Helmet>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Online{" "}
            <span className="italic text-gold-400">PDF Tools</span>
          </h1>
          <p className="text-lg text-gray-500 mb-2">
            Merge, split, compress, convert, and edit PDFs — completely free.
          </p>
          <p className="text-sm text-gray-400">
            No login required. Your files are processed securely and deleted
            immediately.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why DoAide PDF?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure</h3>
              <p className="text-sm text-gray-500">
                Files are processed on our servers and deleted immediately after
                download.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast</h3>
              <p className="text-sm text-gray-500">
                Process PDFs in seconds. No waiting, no queues.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🆓</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                100% Free
              </h3>
              <p className="text-sm text-gray-500">
                All tools are completely free. No login, no limits, no hidden
                fees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
