from pypdf import PdfReader, PdfWriter
from fastapi import HTTPException
from utils import get_temp_path


def parse_page_range(range_str: str, total_pages: int) -> list[int]:
    pages = set()
    for part in range_str.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-", 1)
            start = int(start.strip())
            end = int(end.strip())
            if start < 1 or end > total_pages or start > end:
                raise HTTPException(400, f"Invalid range: {part}. PDF has {total_pages} pages.")
            pages.update(range(start, end + 1))
        else:
            p = int(part.strip())
            if p < 1 or p > total_pages:
                raise HTTPException(400, f"Invalid page: {p}. PDF has {total_pages} pages.")
            pages.add(p)
    return sorted(pages)


def split_pdf(input_path: str, page_range: str) -> str:
    reader = PdfReader(input_path)
    total = len(reader.pages)
    pages = parse_page_range(page_range, total)

    writer = PdfWriter()
    for p in pages:
        writer.add_page(reader.pages[p - 1])

    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output
