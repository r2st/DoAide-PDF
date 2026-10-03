from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from utils import save_upload, cleanup, PDF_TYPES
from services.metadata_service import get_metadata, set_metadata

router = APIRouter(prefix="/api", tags=["metadata"])


@router.post("/metadata/view")
async def view_metadata(
    file: UploadFile = File(..., description="PDF file"),
):
    path = await save_upload(file, PDF_TYPES)
    try:
        meta = get_metadata(path)
        return JSONResponse(meta)
    finally:
        cleanup(path)


@router.post("/metadata/edit")
async def edit_metadata(
    file: UploadFile = File(..., description="PDF file"),
    title: str = Form(None, description="New title"),
    author: str = Form(None, description="New author"),
    subject: str = Form(None, description="New subject"),
):
    path = await save_upload(file, PDF_TYPES)
    try:
        output = set_metadata(path, title, author, subject)
        return FileResponse(output, filename="updated.pdf", media_type="application/pdf")
    finally:
        cleanup(path)
