import json
from groq import Groq
from app.config import GROQ_API_KEY, GROQ_MODEL

client = Groq(api_key=GROQ_API_KEY)

SYSTEM_PROMPT = """You are a professional content repurposer. You will be given a transcript from a YouTube video. Your job is to generate repurposed content in three formats.

You MUST return ONLY valid JSON with exactly these three keys: "summary", "linkedin", "twitter". No markdown, no code fences, no extra text.

Rules for each format:

1. "summary": A concise summary of the video content in 100-150 words. Capture the key points and main takeaways.

2. "linkedin": A professional LinkedIn post in 200-300 words. Make it engaging and thought-provoking. Use line breaks for readability. Include a hook at the beginning. End with a call-to-action or question to drive engagement.

3. "twitter": A Twitter/X thread of up to 8 tweets. Each tweet must be separated by "\\n\\n---\\n\\n" (tweet separator). Each tweet must be under 280 characters. The first tweet should be a hook. The last tweet should be a summary or call-to-action. Number each tweet (1/, 2/, etc.).

Return ONLY the JSON object. No explanations before or after."""


def generate_content(transcript: str) -> dict:
    """Send the transcript to Groq and return the parsed content."""
    if len(transcript) > 30000:
        transcript = transcript[:30000]

    chat_completion = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": f"Here is the YouTube video transcript. Repurpose it into the three formats:\n\n{transcript}",
            },
        ],
        temperature=0.7,
        max_tokens=2048,
        response_format={"type": "json_object"},
    )

    response_text = chat_completion.choices[0].message.content.strip()

    try:
        parsed = json.loads(response_text)
    except json.JSONDecodeError:
        raise ValueError("Failed to parse AI response. Please try again.")

    required_keys = {"summary", "linkedin", "twitter"}
    missing = required_keys - set(parsed.keys())
    if missing:
        raise ValueError(f"AI response missing required fields: {', '.join(missing)}")

    return {
        "summary": parsed["summary"],
        "linkedin": parsed["linkedin"],
        "twitter": parsed["twitter"],
    }
