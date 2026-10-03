from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from utils import save_upload, save_uploads, cleanup, PDF_TYPES, IMAGE_TYPES, DOCX_TYPES
from services.convert_service import pdf_to_images, images_to_pdf, docx_to_pdf, html_to_pdf

router = APIRouter(prefix="/api", tags=["convert"])


@router.post("/to-image")
async def to_image(
    file: UploadFile = File(..., description="PDF file to convert"),
    format: str = Form("png", description="Output format: png or jpg"),
):
    if format not in ("png", "jpg"):
        raise HTTPException(400, "Format must be 'png' or 'jpg'")

    path = await save_upload(file, PDF_TYPES)
    try:
        output = pdf_to_images(path, format)
        ext = ".zip" if output.endswith(".zip") else f".{format}"
        media = "application/zip" if ext == ".zip" else f"image/{format}"
        return FileResponse(output, filename=f"converted{ext}", media_type=media)
    finally:
        cleanup(path)


@router.post("/image-to-pdf")
async def image_to_pdf_route(
    files: list[UploadFile] = File(..., description="Image files to convert"),
):
    paths = await save_uploads(files, IMAGE_TYPES)
    try:
        output = images_to_pdf(paths)
        return FileResponse(output, filename="images.pdf", media_type="application/pdf")
    finally:
        cleanup(*paths)


@router.post("/docx-to-pdf")
async def docx_to_pdf_route(
    file: UploadFile = File(..., description="DOCX file to convert"),
):
    path = await save_upload(file, DOCX_TYPES)
    try:
        output = docx_to_pdf(path)
        return FileResponse(output, filename="converted.pdf", media_type="application/pdf")
    finally:
        cleanup(path)


@router.post("/html-to-pdf")
async def html_to_pdf_route(
    html: str = Form(None, description="HTML content"),
    url: str = Form(None, description="URL to convert"),
):
    if not html and not url:
        raise HTTPException(400, "Provide either 'html' content or 'url'")
    output = html_to_pdf(html_content=html, url=url)
    try:
        return FileResponse(output, filename="converted.pdf", media_type="application/pdf")
    finally:
        pass
