from fastapi import APIRouter, HTTPException
from app.schemas.content import GenerateRequest, GenerateResponse
from app.services.youtube import get_transcript
from app.services.groq_service import generate_content

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest):
    """Extract transcript from YouTube video and generate repurposed content."""
    try:
        transcript = get_transcript(request.url)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while fetching the transcript.",
        )

    try:
        content = generate_content(transcript)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while generating content. Please try again.",
        )

    return GenerateResponse(**content)
