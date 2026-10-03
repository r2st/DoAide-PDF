from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse
from utils import save_upload, cleanup, PDF_TYPES
from services.security_service import protect_pdf, remove_password

router = APIRouter(prefix="/api", tags=["security"])


@router.post("/password/protect")
async def protect(
    file: UploadFile = File(..., description="PDF file to protect"),
    password: str = Form(..., description="Password to set"),
):
    path = await save_upload(file, PDF_TYPES)
    try:
        output = protect_pdf(path, password)
        return FileResponse(output, filename="protected.pdf", media_type="application/pdf")
    finally:
        cleanup(path)


@router.post("/password/remove")
async def remove(
    file: UploadFile = File(..., description="Password-protected PDF"),
    password: str = Form(..., description="Current password"),
):
    path = await save_upload(file, PDF_TYPES)
    try:
        output = remove_password(path, password)
        return FileResponse(output, filename="unlocked.pdf", media_type="application/pdf")
    finally:
        cleanup(path)
