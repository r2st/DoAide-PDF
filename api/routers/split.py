from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse
from utils import save_upload, cleanup, PDF_TYPES
from services.split_service import split_pdf

router = APIRouter(prefix="/api", tags=["split"])


@router.post("/split")
async def split(
    file: UploadFile = File(..., description="PDF file to split"),
    pages: str = Form(..., description="Page range, e.g. 1-3,5,7-9"),
):
    path = await save_upload(file, PDF_TYPES)
    output = None
    try:
        output = split_pdf(path, pages)
        return FileResponse(output, filename="split.pdf", media_type="application/pdf")
    finally:
        cleanup(path)
