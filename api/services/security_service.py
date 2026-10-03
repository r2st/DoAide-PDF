from pypdf import PdfReader, PdfWriter
from fastapi import HTTPException
from utils import get_temp_path


def protect_pdf(input_path: str, password: str) -> str:
    reader = PdfReader(input_path)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.encrypt(password)
    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output


def remove_password(input_path: str, password: str) -> str:
    reader = PdfReader(input_path)
    if reader.is_encrypted:
        if not reader.decrypt(password):
            raise HTTPException(400, "Incorrect password")
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    output = get_temp_path(".pdf")
    writer.write(output)
    writer.close()
    return output
