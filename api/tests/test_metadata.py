import pytest


@pytest.mark.asyncio
async def test_view_metadata(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/metadata/view",
            files=[("file", ("test.pdf", f, "application/pdf"))],
        )
    assert resp.status_code == 200
    data = resp.json()
    assert "pages" in data
    assert data["pages"] == 2
    assert "title" in data
    assert "author" in data


@pytest.mark.asyncio
async def test_edit_metadata(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/metadata/edit",
            files=[("file", ("test.pdf", f, "application/pdf"))],
            data={"title": "Test Title", "author": "Test Author"},
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"
