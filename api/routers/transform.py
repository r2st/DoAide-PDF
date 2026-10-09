from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from utils import save_upload, cleanup, PDF_TYPES
from services.transform_service import rotate_pdf, add_watermark, add_page_numbers, reorder_pages

router = APIRouter(prefix="/api", tags=["transform"])


@router.post("/rotate")
async def rotate(
    file: UploadFile = File(..., description="PDF file to rotate"),
    degrees: int = Form(90, description="Rotation degrees: 90, 180, 270"),
    pages: str = Form(None, description="Page numbers to rotate, e.g. 1,3,5. All if omitted"),
):
    page_nums = None
    if pages:
        page_nums = [int(p.strip()) for p in pages.split(",")]

    path = await save_upload(file, PDF_TYPES)
    try:
        output = rotate_pdf(path, degrees, page_nums)
        return FileResponse(output, filename="rotated.pdf", media_type="application/pdf")
    finally:
        cleanup(path)


@router.post("/watermark")
async def watermark(
    file: UploadFile = File(..., description="PDF file"),
    text: str = Form(..., description="Watermark text"),
    opacity: float = Form(0.3, description="Opacity 0.0-1.0", ge=0.0, le=1.0),
    font_size: int = Form(48, description="Font size", ge=8, le=200),
):
    path = await save_upload(file, PDF_TYPES)
    try:
        output = add_watermark(path, text, opacity, font_size)
        return FileResponse(output, filename="watermarked.pdf", media_type="application/pdf")
    finally:
        cleanup(path)


@router.post("/reorder")
async def reorder(
    file: UploadFile = File(..., description="PDF file to reorder"),
    order: str = Form(..., description="New page order, e.g. 3,1,2,4"),
):
    page_order = [int(p.strip()) for p in order.split(",")]
    path = await save_upload(file, PDF_TYPES)
    try:
        output = reorder_pages(path, page_order)
        return FileResponse(output, filename="reordered.pdf", media_type="application/pdf")
    except ValueError as e:
        raise HTTPException(400, str(e))
    finally:
        cleanup(path)


@router.post("/page-numbers")
async def page_numbers(
    file: UploadFile = File(..., description="PDF file"),
    position: str = Form("bottom-center", description="Position: bottom-center, bottom-left, etc."),
    font_size: int = Form(12, description="Font size", ge=6, le=72),
    start_number: int = Form(1, description="Starting page number"),
):
    path = await save_upload(file, PDF_TYPES)
    try:
        output = add_page_numbers(path, position, font_size, start_number)
        return FileResponse(output, filename="numbered.pdf", media_type="application/pdf")
    finally:
        cleanup(path)
