import pytest


@pytest.mark.asyncio
async def test_split_valid_range(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/split",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"pages": "1"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"


@pytest.mark.asyncio
async def test_split_invalid_range(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/split",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"pages": "5-10"},
        )
    assert resp.status_code == 400
