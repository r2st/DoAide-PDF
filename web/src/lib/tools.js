import {
  FaObjectGroup,
  FaCut,
  FaCompressArrowsAlt,
  FaImage,
  FaFileImage,
  FaSyncAlt,
  FaTint,
  FaLock,
  FaFileWord,
  FaCode,
  FaListOl,
  FaInfoCircle,
  FaSortNumericDown,
} from "react-icons/fa";

const tools = [
  {
    id: "merge",
    name: "PDF Merge",
    description: "Combine multiple PDF files into one document",
    icon: FaObjectGroup,
    path: "/merge",
    color: "bg-blue-500",
    api: "/api/merge",
    accepts: ".pdf",
    multiple: true,
    seo: {
      title: "Merge PDF Files Online — Free | DoAide PDF",
      description:
        "Combine multiple PDF files into one document for free. No login required. Fast and secure.",
    },
  },
  {
    id: "split",
    name: "PDF Split",
    description: "Extract specific pages from a PDF file",
    icon: FaCut,
    path: "/split",
    color: "bg-green-500",
    api: "/api/split",
    accepts: ".pdf",
    multiple: false,
    fields: [{ name: "pages", label: "Page range", placeholder: "e.g. 1-3,5,7-9", required: true }],
    seo: {
      title: "Split PDF — Extract Pages Online Free | DoAide PDF",
      description:
        "Split PDF and extract specific pages for free. No signup needed.",
    },
  },
  {
    id: "compress",
    name: "PDF Compress",
    description: "Reduce PDF file size without losing quality",
    icon: FaCompressArrowsAlt,
    path: "/compress",
    color: "bg-yellow-500",
    api: "/api/compress",
    accepts: ".pdf",
    multiple: false,
    fields: [
      {
        name: "quality",
        label: "Image quality",
        type: "range",
        min: 10,
        max: 100,
        defaultValue: 50,
      },
    ],
    seo: {
      title: "Compress PDF Online — Reduce File Size Free | DoAide PDF",
      description:
        "Compress PDF files and reduce size for free. Fast, secure, no login.",
    },
  },
  {
    id: "to-image",
    name: "PDF to Image",
    description: "Convert PDF pages to JPG or PNG images",
    icon: FaImage,
    path: "/pdf-to-image",
    color: "bg-purple-500",
    api: "/api/to-image",
    accepts: ".pdf",
    multiple: false,
    fields: [
      {
        name: "format",
        label: "Output format",
        type: "select",
        options: ["png", "jpg"],
        defaultValue: "png",
      },
    ],
    seo: {
      title: "PDF to Image — Convert PDF to JPG/PNG Free | DoAide PDF",
      description:
        "Convert PDF pages to high-quality JPG or PNG images for free.",
    },
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG, PNG images to a PDF document",
    icon: FaFileImage,
    path: "/image-to-pdf",
    color: "bg-pink-500",
    api: "/api/image-to-pdf",
    accepts: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    multiple: true,
    seo: {
      title: "Image to PDF — Convert JPG/PNG to PDF Free | DoAide PDF",
      description:
        "Convert images to PDF for free. Supports JPG, PNG, WebP. No login.",
    },
  },
  {
    id: "rotate",
    name: "PDF Rotate",
    description: "Rotate PDF pages by 90°, 180°, or 270°",
    icon: FaSyncAlt,
    path: "/rotate",
    color: "bg-indigo-500",
    api: "/api/rotate",
    accepts: ".pdf",
    multiple: false,
    fields: [
      {
        name: "degrees",
        label: "Rotation",
        type: "select",
        options: [
          { value: "90", label: "90° Clockwise" },
          { value: "180", label: "180°" },
          { value: "270", label: "270° Clockwise" },
        ],
        defaultValue: "90",
      },
    ],
    seo: {
      title: "Rotate PDF Pages Online Free | DoAide PDF",
      description:
        "Rotate PDF pages by 90°, 180°, or 270° for free. No login needed.",
    },
  },
  {
    id: "watermark",
    name: "PDF Watermark",
    description: "Add a text watermark to your PDF pages",
    icon: FaTint,
    path: "/watermark",
    color: "bg-teal-500",
    api: "/api/watermark",
    accepts: ".pdf",
    multiple: false,
    fields: [
      { name: "text", label: "Watermark text", placeholder: "CONFIDENTIAL", required: true },
      { name: "opacity", label: "Opacity", type: "range", min: 0.1, max: 1, step: 0.1, defaultValue: 0.3 },
      { name: "font_size", label: "Font size", type: "number", min: 8, max: 200, defaultValue: 48 },
    ],
    seo: {
      title: "Add Watermark to PDF Free Online | DoAide PDF",
      description:
        "Add text watermark to PDF files for free. Customise opacity and font size.",
    },
  },
  {
    id: "password-protect",
    name: "PDF Password",
    description: "Add or remove password protection from PDFs",
    icon: FaLock,
    path: "/password",
    color: "bg-red-500",
    api: "/api/password/protect",
    accepts: ".pdf",
    multiple: false,
    fields: [{ name: "password", label: "Password", type: "password", required: true }],
    subTools: [
      { id: "protect", name: "Protect", api: "/api/password/protect" },
      { id: "remove", name: "Remove Password", api: "/api/password/remove" },
    ],
    seo: {
      title: "PDF Password — Protect or Unlock PDF Free | DoAide PDF",
      description:
        "Add or remove password from PDF files for free online.",
    },
  },
  {
    id: "docx-to-pdf",
    name: "Word to PDF",
    description: "Convert DOCX documents to PDF format",
    icon: FaFileWord,
    path: "/word-to-pdf",
    color: "bg-blue-600",
    api: "/api/docx-to-pdf",
    accepts: ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: false,
    seo: {
      title: "Word to PDF — Convert DOCX to PDF Free | DoAide PDF",
      description:
        "Convert Word documents (.docx) to PDF for free. No login required.",
    },
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    description: "Convert HTML content or a URL to PDF",
    icon: FaCode,
    path: "/html-to-pdf",
    color: "bg-gray-600",
    api: "/api/html-to-pdf",
    accepts: null,
    multiple: false,
    noFile: true,
    fields: [
      { name: "html", label: "HTML Content", type: "textarea", placeholder: "<h1>Hello World</h1>" },
      { name: "url", label: "Or enter a URL", placeholder: "https://example.com" },
    ],
    seo: {
      title: "HTML to PDF — Convert Webpage to PDF Free | DoAide PDF",
      description:
        "Convert HTML content or any URL to PDF for free online.",
    },
  },
  {
    id: "page-numbers",
    name: "Page Numbers",
    description: "Add page numbers to your PDF document",
    icon: FaListOl,
    path: "/page-numbers",
    color: "bg-orange-500",
    api: "/api/page-numbers",
    accepts: ".pdf",
    multiple: false,
    fields: [
      {
        name: "position",
        label: "Position",
        type: "select",
        options: [
          { value: "bottom-center", label: "Bottom Center" },
          { value: "bottom-left", label: "Bottom Left" },
          { value: "bottom-right", label: "Bottom Right" },
          { value: "top-center", label: "Top Center" },
          { value: "top-left", label: "Top Left" },
          { value: "top-right", label: "Top Right" },
        ],
        defaultValue: "bottom-center",
      },
      { name: "start_number", label: "Start from", type: "number", defaultValue: 1, min: 1 },
    ],
    seo: {
      title: "Add Page Numbers to PDF Free Online | DoAide PDF",
      description:
        "Add page numbers to any PDF file for free. Choose position and starting number.",
    },
  },
  {
    id: "reorder",
    name: "Page Reorder",
    description: "Rearrange pages in your PDF in any order",
    icon: FaSortNumericDown,
    path: "/reorder",
    color: "bg-amber-500",
    api: "/api/reorder",
    accepts: ".pdf",
    multiple: false,
    fields: [
      { name: "order", label: "New page order", placeholder: "e.g. 3,1,2,4", required: true },
    ],
    seo: {
      title: "Reorder PDF Pages Online Free | DoAide PDF",
      description:
        "Rearrange and reorder PDF pages in any order for free. No login required. Fast and secure.",
    },
  },
  {
    id: "metadata",
    name: "PDF Metadata",
    description: "View and edit PDF document properties",
    icon: FaInfoCircle,
    path: "/metadata",
    color: "bg-cyan-500",
    api: "/api/metadata/view",
    accepts: ".pdf",
    multiple: false,
    isMetadata: true,
    seo: {
      title: "View & Edit PDF Metadata Free Online | DoAide PDF",
      description:
        "View and edit PDF document properties — title, author, subject — for free.",
    },
  },
];

export default tools;
