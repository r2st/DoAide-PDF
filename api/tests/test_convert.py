import pytest


@pytest.mark.asyncio
async def test_pdf_to_image_png(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/to-image",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"format": "png"},
        )
    assert resp.status_code == 200


@pytest.mark.asyncio
async def test_image_to_pdf(client, sample_image):
    with open(sample_image, "rb") as f:
        resp = await client.post(
            "/api/image-to-pdf",
            files=[("files", ("test.png", f, "image/png"))],
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"
