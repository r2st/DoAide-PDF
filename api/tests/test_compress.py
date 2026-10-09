import pytest


@pytest.mark.asyncio
async def test_compress_pdf(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/compress",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"quality": "50"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"


@pytest.mark.asyncio
async def test_compress_with_high_quality(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/compress",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"quality": "90"},
        )
    assert resp.status_code == 200
