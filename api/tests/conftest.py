import os
import sys
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from main import app


@pytest.fixture
def sample_pdf(tmp_path):
    from pypdf import PdfWriter

    path = tmp_path / "test.pdf"
    writer = PdfWriter()
    writer.add_blank_page(width=612, height=792)
    writer.add_blank_page(width=612, height=792)
    writer.write(str(path))
    writer.close()
    return path


@pytest.fixture
def sample_image(tmp_path):
    from PIL import Image

    path = tmp_path / "test.png"
    img = Image.new("RGB", (100, 100), color="red")
    img.save(str(path))
    return path


@pytest.fixture
def sample_pdf_protected(tmp_path, sample_pdf):
    from pypdf import PdfReader, PdfWriter

    reader = PdfReader(str(sample_pdf))
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.encrypt("testpass")
    path = tmp_path / "protected.pdf"
    writer.write(str(path))
    writer.close()
    return path


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
