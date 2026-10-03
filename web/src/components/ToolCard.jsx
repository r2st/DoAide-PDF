import { Link } from "react-router-dom";

export default function ToolCard({ tool }) {
  const Icon = tool.icon;
  return (
    <Link
      to={tool.path}
      className="group block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-gold-400 transition-all no-underline"
    >
      <div
        className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className="text-white text-xl" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
      <p className="text-sm text-gray-500">{tool.description}</p>
    </Link>
  );
}
