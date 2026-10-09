from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from utils import get_temp_path
import io


def rotate_pdf(input_path: str, degrees: int, page_nums: list[int] | None = None) -> str:
    reader = PdfReader(input_path)
    writer = PdfWriter()

    for i, page in enumerate(reader.pages):
        if page_nums is None or (i + 1) in page_nums:
            page.rotate(degrees)
        writer.add_page(page)

    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output


def add_watermark(input_path: str, text: str, opacity: float = 0.3, font_size: int = 48) -> str:
    reader = PdfReader(input_path)
    writer = PdfWriter()

    for page in reader.pages:
        media_box = page.mediabox
        w = float(media_box.width)
        h = float(media_box.height)

        buf = io.BytesIO()
        c = canvas.Canvas(buf, pagesize=(w, h))
        c.saveState()
        c.setFillAlpha(opacity)
        c.setFillColorRGB(0.5, 0.5, 0.5)
        c.setFont("Helvetica", font_size)
        c.translate(w / 2, h / 2)
        c.rotate(45)
        c.drawCentredString(0, 0, text)
        c.restoreState()
        c.save()
        buf.seek(0)

        watermark_reader = PdfReader(buf)
        page.merge_page(watermark_reader.pages[0])
        writer.add_page(page)

    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output


def reorder_pages(input_path: str, order: list[int]) -> str:
    reader = PdfReader(input_path)
    writer = PdfWriter()
    total = len(reader.pages)

    for page_num in order:
        if page_num < 1 or page_num > total:
            raise ValueError(f"Page {page_num} out of range (1-{total})")
        writer.add_page(reader.pages[page_num - 1])

    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output


def add_page_numbers(
    input_path: str,
    position: str = "bottom-center",
    font_size: int = 12,
    start_number: int = 1,
) -> str:
    reader = PdfReader(input_path)
    writer = PdfWriter()

    for i, page in enumerate(reader.pages):
        media_box = page.mediabox
        w = float(media_box.width)
        h = float(media_box.height)

        buf = io.BytesIO()
        c = canvas.Canvas(buf, pagesize=(w, h))
        c.setFont("Helvetica", font_size)
        num = start_number + i

        positions = {
            "bottom-center": (w / 2, 30),
            "bottom-left": (40, 30),
            "bottom-right": (w - 40, 30),
            "top-center": (w / 2, h - 30),
            "top-left": (40, h - 30),
            "top-right": (w - 40, h - 30),
        }
        x, y = positions.get(position, (w / 2, 30))
        c.drawCentredString(x, y, str(num))
        c.save()
        buf.seek(0)

        overlay = PdfReader(buf)
        page.merge_page(overlay.pages[0])
        writer.add_page(page)

    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output
