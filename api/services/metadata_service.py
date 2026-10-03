from pypdf import PdfReader, PdfWriter
from utils import get_temp_path


def get_metadata(input_path: str) -> dict:
    reader = PdfReader(input_path)
    meta = reader.metadata or {}
    return {
        "title": meta.get("/Title", ""),
        "author": meta.get("/Author", ""),
        "subject": meta.get("/Subject", ""),
        "creator": meta.get("/Creator", ""),
        "producer": meta.get("/Producer", ""),
        "pages": len(reader.pages),
        "encrypted": reader.is_encrypted,
    }


def set_metadata(input_path: str, title: str | None, author: str | None, subject: str | None) -> str:
    reader = PdfReader(input_path)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)

    metadata = {}
    if title is not None:
        metadata["/Title"] = title
    if author is not None:
        metadata["/Author"] = author
    if subject is not None:
        metadata["/Subject"] = subject

    if metadata:
        writer.add_metadata(metadata)

    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output
