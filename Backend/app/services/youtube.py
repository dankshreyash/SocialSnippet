import re
import os
import base64
import tempfile
import http.cookiejar
import requests
from youtube_transcript_api import YouTubeTranscriptApi

def get_cookies_path():
    """Decode YOUTUBE_COOKIES env var and save to a temporary file."""
    cookies_b64 = os.environ.get("YOUTUBE_COOKIES")
    if not cookies_b64:
        # If running locally, check if cookies.txt exists in the same directory
        if os.path.exists("cookies.txt"):
            return "cookies.txt"
        return None
    
    try:
        # Save to a temporary file (works on Vercel /tmp)
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
    cookies_path = get_cookies_path()
    
    api = None
    cookie_error = ""
    if cookies_path:
        try:
            session = requests.Session()
            session.headers.update({
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            })
            cj = http.cookiejar.MozillaCookieJar(cookies_path)
            cj.load(ignore_discard=True, ignore_expires=True)
            session.cookies = cj
            cookie_error = f"LOADED {len(cj)} COOKIES"
            api = YouTubeTranscriptApi(http_client=session)
        except Exception as ce:
            cookie_error = f"COOKIE LOAD ERROR: {str(ce)}"
            fallback_session = requests.Session()
            fallback_session.headers.update({
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            })
            api = YouTubeTranscriptApi(http_client=fallback_session)
    else:
        cookie_error = "NO COOKIES PATH RETURNED"
        fallback_session = requests.Session()
        fallback_session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        })
        api = YouTubeTranscriptApi(http_client=fallback_session)

    try:
        # Try fetching the default transcript (usually English)
        transcript = api.fetch(video_id)
    except Exception as e1:
        try:
            # Fallback to listing transcripts and picking the first available
            transcript_list = api.list(video_id)
            available = list(transcript_list)
            if not available:
                raise ValueError("No transcripts available for this video.")
            first = available[0]
            transcript = api.fetch(video_id, languages=[first.language_code])
        except ValueError:
            raise
        except Exception as e2:
            raise ValueError(
                f"Could not retrieve transcript. {cookie_error} | Debug: {str(e1)} | {str(e2)}"
            )

    full_text = " ".join(snippet.text for snippet in transcript.snippets)

    if not full_text.strip():
        raise ValueError("Transcript is empty. The video may not contain spoken content.")

    return full_text
