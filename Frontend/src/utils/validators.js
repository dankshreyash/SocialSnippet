/**
 * Validate a YouTube URL.
 * Supports youtube.com/watch, youtu.be, and youtube.com/shorts formats.
 */
export function isValidYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return false;

  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;
  return pattern.test(url.trim());
}
