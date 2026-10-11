import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-da-500 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5 no-underline">
          <span className="text-2xl font-bold text-white">DoAide</span>
          <span className="text-white/60 text-2xl font-light">|</span>
          <span className="text-2xl font-bold text-white/90">PDF</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-white/80 hover:text-white text-sm font-medium no-underline"
          >
            All Tools
          </Link>
          <Link
            to="/blog"
            className="text-white/80 hover:text-white text-sm font-medium no-underline"
          >
            Blog
          </Link>
          <a
            href="https://doaide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-sm font-medium no-underline"
          >
            DoAide.com
          </a>
        </nav>
      </div>
    </header>
  );
}
