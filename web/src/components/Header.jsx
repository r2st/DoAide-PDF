import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 no-underline">
          <span className="text-2xl font-bold text-gray-900">DoAide</span>
          <span className="text-2xl font-bold italic text-gold-400">PDF</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium no-underline"
          >
            All Tools
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium no-underline"
          >
            Blog
          </Link>
          <a
            href="https://doaide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium no-underline"
          >
            DoAide.com
          </a>
        </nav>
      </div>
    </header>
  );
}
