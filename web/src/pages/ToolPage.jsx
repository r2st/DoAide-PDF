import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaDownload, FaSpinner } from "react-icons/fa";
import FileDropzone from "../components/FileDropzone";
import ShareButtons from "../components/ShareButtons";
import tools from "../lib/tools";
import { processFile, processFileJson, downloadBlob } from "../lib/api";

export default function ToolPage() {
  const { toolPath } = useParams();
  const tool = useMemo(
    () => tools.find((t) => t.path === `/${toolPath}`),
    [toolPath]
  );

  const [files, setFiles] = useState([]);
  const [fields, setFields] = useState(() => {
    if (!tool?.fields) return {};
    return tool.fields.reduce((acc, f) => {
      if (f.defaultValue !== undefined) acc[f.name] = f.defaultValue;
      return acc;
    }, {});
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [activeSubTool, setActiveSubTool] = useState(0);

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tool not found
        </h2>
        <Link to="/" className="text-gold-500 hover:underline">
          Back to all tools
        </Link>
      </div>
    );
  }

  const Icon = tool.icon;
  const currentApi =
    tool.subTools ? tool.subTools[activeSubTool].api : tool.api;

  const handleProcess = async () => {
    if (!tool.noFile && files.length === 0) {
      setError("Please upload a file first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    setMetadata(null);
    setProgress(0);

    try {
      const formData = new FormData();

      if (tool.multiple) {
        files.forEach((f) => formData.append("files", f));
      } else if (!tool.noFile && files.length > 0) {
        formData.append("file", files[0]);
      }

      Object.entries(fields).forEach(([key, val]) => {
        if (val !== undefined && val !== "") {
          formData.append(key, val);
        }
      });

      if (tool.isMetadata && currentApi.includes("view")) {
        const data = await processFileJson(currentApi, formData);
        setMetadata(data);
      } else {
        const blob = await processFile(currentApi, formData, setProgress);
        setResult(blob);
      }
    } catch (err) {
      const msg =
        err.response?.data instanceof Blob
          ? await err.response.data.text()
          : err.response?.data?.detail || err.message;
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const ext = result.type.includes("zip") ? ".zip" : ".pdf";
    const isImage =
      result.type.includes("png") || result.type.includes("jpeg");
    const imgExt = result.type.includes("png") ? ".png" : ".jpg";
    downloadBlob(result, `doaide-${tool.id}${isImage ? imgExt : ext}`);
  };

  const handleEditMetadata = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      Object.entries(fields).forEach(([key, val]) => {
        if (val !== undefined && val !== "") {
          formData.append(key, val);
        }
      });
      const blob = await processFile("/api/metadata/edit", formData);
      setResult(blob);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{tool.seo.title}</title>
        <meta name="description" content={tool.seo.description} />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 no-underline"
        >
          <FaArrowLeft /> All Tools
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center`}
          >
            <Icon className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
            <p className="text-gray-500">{tool.description}</p>
          </div>
        </div>

        {tool.subTools && (
          <div className="flex gap-2 mb-6">
            {tool.subTools.map((st, i) => (
              <button
                key={st.id}
                onClick={() => {
                  setActiveSubTool(i);
                  setResult(null);
                  setError("");
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSubTool === i
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          {!tool.noFile && (
            <FileDropzone
              files={files}
              setFiles={setFiles}
              accept={tool.accepts}
              multiple={tool.multiple}
            />
          )}

          {tool.fields && (
            <div className="mt-4 space-y-4">
              {tool.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.type === "range" && (
                      <span className="ml-2 text-gray-400">
                        ({fields[field.name] ?? field.defaultValue})
                      </span>
                    )}
                  </label>
                  {field.type === "select" ? (
                    <select
                      value={fields[field.name] ?? field.defaultValue ?? ""}
                      onChange={(e) =>
                        setFields({ ...fields, [field.name]: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      {field.options.map((opt) => {
                        const val =
                          typeof opt === "string" ? opt : opt.value;
                        const label =
                          typeof opt === "string" ? opt : opt.label;
                        return (
                          <option key={val} value={val}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={fields[field.name] ?? ""}
                      onChange={(e) =>
                        setFields({ ...fields, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      rows={5}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  ) : field.type === "range" ? (
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step || 1}
                      value={fields[field.name] ?? field.defaultValue}
                      onChange={(e) =>
                        setFields({
                          ...fields,
                          [field.name]: parseFloat(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={fields[field.name] ?? ""}
                      onChange={(e) =>
                        setFields({ ...fields, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      required={field.required}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleProcess}
            disabled={loading}
            className="mt-6 w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Processing{progress > 0 ? ` (${progress}%)` : "..."}
              </>
            ) : tool.isMetadata ? (
              "View Metadata"
            ) : (
              `Process ${tool.name}`
            )}
          </button>
        </div>

        {metadata && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              PDF Metadata
            </h3>
            <div className="space-y-2">
              {Object.entries(metadata).map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between text-sm border-b border-gray-100 py-2"
                >
                  <span className="text-gray-500 capitalize">{key}</span>
                  <span className="text-gray-900 font-medium">
                    {String(val) || "—"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Edit Metadata
              </h4>
              <div className="space-y-3">
                {["title", "author", "subject"].map((f) => (
                  <input
                    key={f}
                    type="text"
                    placeholder={`New ${f}`}
                    value={fields[f] ?? ""}
                    onChange={(e) =>
                      setFields({ ...fields, [f]: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                ))}
              </div>
              <button
                onClick={handleEditMetadata}
                disabled={loading}
                className="mt-3 w-full bg-gold-400 text-white py-2 rounded-lg font-medium hover:bg-gold-500 disabled:opacity-50"
              >
                Save Metadata
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-700 font-medium mb-4">
              Your file is ready!
            </p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            >
              <FaDownload /> Download
            </button>
          </div>
        )}

        <ShareButtons toolName={tool.name} />

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Powered by{" "}
            <a
              href="https://doaide.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:underline"
            >
              DoAide
            </a>{" "}
            — Your files are processed securely and deleted immediately.
          </p>
        </div>
      </div>
    </>
  );
}
