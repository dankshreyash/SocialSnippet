import re
from youtube_transcript_api import YouTubeTranscriptApi

api = YouTubeTranscriptApi()


def extract_video_id(url: str) -> str:
    """Extract the video ID from various YouTube URL formats."""
    patterns = [
        r"(?:youtube\.com/watch\?v=)([\w\-]+)",
        r"(?:youtu\.be/)([\w\-]+)",
        r"(?:youtube\.com/shorts/)([\w\-]+)",
        r"(?:youtube\.com/embed/)([\w\-]+)",
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    raise ValueError("Could not extract video ID from the provided URL.")


def get_transcript(url: str) -> str:
    """Fetch and concatenate the transcript for a YouTube video."""
    video_id = extract_video_id(url)

    try:
        transcript = api.fetch(video_id)
    except Exception:
        try:
            transcript_list = api.list(video_id)
            available = list(transcript_list)
            if not available:
                raise ValueError(
                    "No transcripts available for this video."
                )
            first = available[0]
            transcript = api.fetch(video_id, languages=[first.language_code])
        except ValueError:
            raise
        except Exception:
            raise ValueError(
                "Could not retrieve transcript. The video may not have captions available."
            )

    full_text = " ".join(snippet.text for snippet in transcript.snippets)

    if not full_text.strip():
        raise ValueError("Transcript is empty. The video may not contain spoken content.")

    return full_text
