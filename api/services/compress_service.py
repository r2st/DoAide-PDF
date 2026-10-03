import io
from pypdf import PdfReader, PdfWriter
from PIL import Image
from utils import get_temp_path


def compress_pdf(input_path: str, quality: int = 50) -> str:
    reader = PdfReader(input_path)
    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    writer.compress_identical_objects(remove_identicals=True, remove_orphans=True)

    for page in writer.pages:
        for img in page.images:
            try:
                pil_img = Image.open(io.BytesIO(img.data))
                if pil_img.mode in ("RGBA", "P"):
                    pil_img = pil_img.convert("RGB")
                buf = io.BytesIO()
                pil_img.save(buf, format="JPEG", quality=quality, optimize=True)
                img.replace(buf.getvalue())
            except Exception:
                continue

    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output
