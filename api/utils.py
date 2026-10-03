import os
import uuid
import shutil
import tempfile
from fastapi import UploadFile, HTTPException
from config import settings


def get_temp_path(ext: str = "") -> str:
    return os.path.join(settings.temp_dir, f"{uuid.uuid4().hex}{ext}")


async def save_upload(file: UploadFile, allowed_types: list[str] | None = None) -> str:
    if file.size and file.size > settings.max_file_size_bytes:
        raise HTTPException(413, f"File too large. Max size: {settings.max_file_size_mb}MB")

    if allowed_types and file.content_type not in allowed_types:
        raise HTTPException(
            415,
            f"Unsupported file type: {file.content_type}. Allowed: {', '.join(allowed_types)}",
        )

    ext = os.path.splitext(file.filename or "")[1] or ""
    path = get_temp_path(ext)
    with open(path, "wb") as f:
        content = await file.read()
        if len(content) > settings.max_file_size_bytes:
            raise HTTPException(413, f"File too large. Max size: {settings.max_file_size_mb}MB")
        f.write(content)
    return path


async def save_uploads(files: list[UploadFile], allowed_types: list[str] | None = None) -> list[str]:
    paths = []
    for file in files:
        paths.append(await save_upload(file, allowed_types))
    return paths


def cleanup(*paths: str):
    for p in paths:
        try:
            if os.path.isfile(p):
                os.unlink(p)
            elif os.path.isdir(p):
                shutil.rmtree(p)
        except OSError:
            pass


PDF_TYPES = ["application/pdf"]
IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/tiff", "image/bmp"]
DOCX_TYPES = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
]
