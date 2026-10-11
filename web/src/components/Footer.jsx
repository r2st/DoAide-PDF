import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-white">DoAide</span>
              <span className="text-white/40 text-lg font-light">|</span>
              <span className="text-lg font-bold text-white/80">PDF</span>
            </div>
            <span className="text-xs text-da-500 font-medium">
              A DoAide Product
            </span>
          </div>
          <p className="text-sm">
            Free online PDF tools. No login required.
          </p>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/blog"
                className="hover:text-white no-underline text-gray-400"
              >
                Blog
              </Link>
              <a
                href="https://doaide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white no-underline text-gray-400"
              >
                DoAide.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <a
                href="https://doaide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 no-underline text-gray-500"
              >
                More DoAide Products
              </a>
              <span>&middot;</span>
              <span>&copy; {new Date().getFullYear()} DoAide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
