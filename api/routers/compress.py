from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse
from utils import save_upload, cleanup, PDF_TYPES
from services.compress_service import compress_pdf

router = APIRouter(prefix="/api", tags=["compress"])


@router.post("/compress")
async def compress(
    file: UploadFile = File(..., description="PDF file to compress"),
    quality: int = Form(50, description="Image quality 1-100", ge=1, le=100),
):
    path = await save_upload(file, PDF_TYPES)
    output = None
    try:
        output = compress_pdf(path, quality)
        return FileResponse(output, filename="compressed.pdf", media_type="application/pdf")
    finally:
        cleanup(path)
