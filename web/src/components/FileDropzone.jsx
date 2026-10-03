import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTimesCircle, FaFilePdf, FaFileImage } from "react-icons/fa";

export default function FileDropzone({
  files,
  setFiles,
  accept,
  multiple = false,
  maxSize = 50 * 1024 * 1024,
}) {
  const onDrop = useCallback(
    (accepted) => {
      if (multiple) {
        setFiles((prev) => [...prev, ...accepted]);
      } else {
        setFiles(accepted.slice(0, 1));
      }
    },
    [multiple, setFiles]
  );

  const acceptObj = accept
    ? accept.split(",").reduce((acc, t) => {
        const trimmed = t.trim();
        if (trimmed.startsWith(".")) {
          const mime =
            trimmed === ".pdf"
              ? "application/pdf"
              : trimmed === ".docx" || trimmed === ".doc"
                ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                : `image/${trimmed.slice(1)}`;
          acc[mime] = [...(acc[mime] || []), trimmed];
        } else if (trimmed.includes("/")) {
          acc[trimmed] = [];
        }
        return acc;
      }, {})
    : undefined;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptObj,
    multiple,
    maxSize,
  });

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-gold-400 bg-yellow-50"
            : "border-gray-300 hover:border-gold-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-3" />
        {isDragActive ? (
          <p className="text-gray-600 font-medium">Drop files here...</p>
        ) : (
          <>
            <p className="text-gray-600 font-medium">
              Drag & drop {multiple ? "files" : "a file"} here
            </p>
            <p className="text-gray-400 text-sm mt-1">
              or click to browse (max {maxSize / 1024 / 1024}MB)
            </p>
          </>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2"
            >
              {file.type === "application/pdf" ? (
                <FaFilePdf className="text-red-500 text-lg flex-shrink-0" />
              ) : (
                <FaFileImage className="text-blue-500 text-lg flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 truncate flex-1">
                {file.name}
              </span>
              <span className="text-xs text-gray-400">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-gray-400 hover:text-red-500"
              >
                <FaTimesCircle />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
