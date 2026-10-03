import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    host: str = "172.18.0.1"
    port: int = 3048
    max_file_size_mb: int = 50
    allowed_origins: str = "http://localhost:3049,https://pdf.doaide.com"
    temp_dir: str = "/tmp/doaide-pdf"

    @property
    def max_file_size_bytes(self) -> int:
        return self.max_file_size_mb * 1024 * 1024

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",")]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
os.makedirs(settings.temp_dir, exist_ok=True)
