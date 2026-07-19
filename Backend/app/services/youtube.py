import re
import yt_dlp
import requests

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
    video_id = extract_video_id(url)
    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'writesubtitles': True,
        'writeautomaticsub': True,
        'subtitleslangs': ['en', 'hi', 'en-US'],
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
        subs = info.get('subtitles', {})
        caps = info.get('automatic_captions', {})
        
        # Try finding English first, then Hindi
        for lang in ['en', 'en-US', 'hi']:
            target = subs.get(lang) or caps.get(lang)
            if target:
                # Find the JSON3 format
                json3_url = next((x['url'] for x in target if x['ext'] == 'json3'), None)
                if json3_url:
                    headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                    }
                    response = requests.get(json3_url, headers=headers)
                    response.raise_for_status()
                    data = response.json()
                    
                    text_chunks = []
                    for event in data.get('events', []):
                        if 'segs' in event:
                            for seg in event['segs']:
                                text_chunks.append(seg.get('utf8', ''))
                                
                    full_text = " ".join(text_chunks).replace('\\n', ' ')
                    full_text = re.sub(' +', ' ', full_text).strip()
                    
                    if full_text:
                        return full_text
                        
        raise ValueError("Could not find suitable captions (English or Hindi) for this video.")
        
    except Exception as e:
        raise ValueError(f"yt-dlp failed to retrieve transcript: {str(e)}")
