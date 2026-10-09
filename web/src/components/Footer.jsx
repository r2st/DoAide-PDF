import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-white">DoAide</span>
            <span className="text-lg font-bold italic text-gold-400">PDF</span>
          </div>
          <p className="text-sm">
            Free online PDF tools. No login required.
          </p>
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
            <span className="text-gray-600">
              &copy; {new Date().getFullYear()} DoAide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
