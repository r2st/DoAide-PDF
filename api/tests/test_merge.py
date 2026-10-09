import pytest


@pytest.mark.asyncio
async def test_merge_two_pdfs(client, sample_pdf):
    with open(sample_pdf, "rb") as f1, open(sample_pdf, "rb") as f2:
        resp = await client.post(
            "/api/merge",
            files=[
                ("files", ("a.pdf", f1, "application/pdf")),
                ("files", ("b.pdf", f2, "application/pdf")),
            ],
        )
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"
    assert len(resp.content) > 0


@pytest.mark.asyncio
async def test_merge_one_pdf_fails(client, sample_pdf):
    with open(sample_pdf, "rb") as f:
        resp = await client.post(
            "/api/merge",
            files=[("files", ("a.pdf", f, "application/pdf"))],
        )
    assert resp.status_code == 400
