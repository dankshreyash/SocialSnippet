import re
from youtube_transcript_api import YouTubeTranscriptApi

import os
import base64
import tempfile

def get_cookies_path():
    cookies_b64 = os.environ.get("YOUTUBE_COOKIES")
    if not cookies_b64:
        if os.path.exists("cookies.txt"):
            return "cookies.txt"
        return None
    try:
        tmp_dir = tempfile.gettempdir()
        cookie_path = os.path.join(tmp_dir, "youtube_cookies.txt")
        with open(cookie_path, "wb") as f:
            f.write(base64.b64decode(cookies_b64))
        return cookie_path
    except Exception:
        return None



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

    cookies = get_cookies_path()
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, cookies=cookies)
    except Exception:
        try:
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id, cookies=cookies)
            available = list(transcript_list)
            if not available:
                raise ValueError("No transcripts available for this video.")
            first = available[0]
            transcript = first.fetch()
        except ValueError:
            raise
        except Exception:
            raise ValueError(
                "Could not retrieve transcript. The video may not have captions available."
            )

    full_text = " ".join(snippet["text"] for snippet in transcript)

    if not full_text.strip():
        raise ValueError("Transcript is empty. The video may not contain spoken content.")

    return full_text
