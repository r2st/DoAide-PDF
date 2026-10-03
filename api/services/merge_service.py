from pypdf import PdfWriter
from utils import get_temp_path


def merge_pdfs(input_paths: list[str]) -> str:
    writer = PdfWriter()
    for path in input_paths:
        writer.append(path)
    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output
