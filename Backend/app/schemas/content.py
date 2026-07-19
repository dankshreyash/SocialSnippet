from pydantic import BaseModel, field_validator
import re


class GenerateRequest(BaseModel):
    url: str

    @field_validator("url")
    @classmethod
    def validate_youtube_url(cls, v):
        youtube_pattern = re.compile(
            r"^(https?://)?(www\.)?(youtube\.com/(watch\?v=|shorts/)|youtu\.be/)[\w\-]+"
        )
        if not youtube_pattern.match(v):
            raise ValueError("Invalid YouTube URL. Please provide a valid YouTube video link.")
        return v


class GenerateResponse(BaseModel):
    summary: str
    linkedin: str
    twitter: str
