import pytest


@pytest.mark.asyncio
async def test_password_protect(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/password/protect",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"password": "secret123"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"


@pytest.mark.asyncio
async def test_password_remove(client, sample_pdf_protected):
    with open(sample_pdf_protected, "rb") as f:
        resp = await client.post(
            "/api/password/remove",
            files=[("file", ("protected.pdf", f, "application/pdf"))],
            data={"password": "testpass"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"
