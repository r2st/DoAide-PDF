from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse
from utils import save_uploads, cleanup, PDF_TYPES
from services.merge_service import merge_pdfs

router = APIRouter(prefix="/api", tags=["merge"])


@router.post("/merge")
async def merge(files: list[UploadFile] = File(..., description="PDF files to merge")):
    if len(files) < 2:
        from fastapi import HTTPException
        raise HTTPException(400, "At least 2 PDF files required")

    paths = await save_uploads(files, PDF_TYPES)
    output = None
    try:
        output = merge_pdfs(paths)
        return FileResponse(output, filename="merged.pdf", media_type="application/pdf")
    finally:
        cleanup(*paths)
