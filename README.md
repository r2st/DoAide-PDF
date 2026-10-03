# DoAide PDF — Free Online PDF Tools

Free online PDF toolkit at [pdf.doaide.com](https://pdf.doaide.com). No login required.

## Tools

- **PDF Merge** — Combine multiple PDFs into one
- **PDF Split** — Extract specific pages from a PDF
- **PDF Compress** — Reduce PDF file size
- **PDF to Image** — Convert PDF pages to JPG/PNG
- **Image to PDF** — Convert images to PDF
- **PDF Rotate** — Rotate PDF pages
- **PDF Watermark** — Add text watermark
- **PDF Password** — Add/remove password protection
- **Word to PDF** — Convert DOCX to PDF
- **HTML to PDF** — Convert HTML/URL to PDF
- **Page Numbers** — Add page numbers
- **PDF Metadata** — View/edit metadata

## Architecture

- **Backend**: Python FastAPI on port 3048
- **Frontend**: React + Vite + Tailwind CSS on port 3049
- **Server**: 89.167.8.178

## Development

### API

```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Web

```bash
cd web
npm install
npm run dev
```

## Deployment

```bash
sudo bash deploy/setup.sh
```

## Environment Variables

Copy `.env.example` files in both `api/` and `web/` directories.
