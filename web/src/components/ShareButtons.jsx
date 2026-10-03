import { FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function ShareButtons({ toolName }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `Check out ${toolName} — a free PDF tool by DoAide! No login required.`;

  const whatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3 mt-6">
      <span className="text-sm text-gray-500">Share:</span>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 no-underline"
      >
        <FaWhatsapp /> WhatsApp
      </a>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-500 text-white rounded-full text-sm font-medium hover:bg-sky-600 no-underline"
      >
        <FaTwitter /> Twitter
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-700 text-white rounded-full text-sm font-medium hover:bg-blue-800 no-underline"
      >
        <FaLinkedin /> LinkedIn
      </a>
    </div>
  );
}
