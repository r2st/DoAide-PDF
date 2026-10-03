from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import merge, split, compress, convert, transform, security, metadata

app = FastAPI(
    title="DoAide PDF API",
    description="Free PDF tools API — merge, split, compress, convert, and more.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(merge.router)
app.include_router(split.router)
app.include_router(compress.router)
app.include_router(convert.router)
app.include_router(transform.router)
app.include_router(security.router)
app.include_router(metadata.router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "doaide-pdf-api"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host=settings.host, port=settings.port, reload=True)
