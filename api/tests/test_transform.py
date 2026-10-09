import pytest


@pytest.mark.asyncio
async def test_rotate(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/rotate",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"degrees": "90"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"


@pytest.mark.asyncio
async def test_watermark(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/watermark",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"text": "TEST", "opacity": "0.5", "font_size": "36"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"


@pytest.mark.asyncio
async def test_page_numbers(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/page-numbers",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"position": "bottom-center", "start_number": "1"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"
