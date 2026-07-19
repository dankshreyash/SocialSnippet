import { useState } from 'react';
import { HiArrowPath } from 'react-icons/hi2';
import { isValidYouTubeUrl } from '../utils/validators';

export default function UrlInput({ onGenerate, loading }) {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (url.trim()) {
      onGenerate(url.trim());
    }
  }

  const isValid = url.trim() === '' || isValidYouTubeUrl(url);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 w-full flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 leading-tight">
          Repurpose Your
          <span className="bg-gradient-to-r from-accent-400 via-cyan-400 to-accent-300 bg-clip-text text-transparent"> YouTube Content</span>
        </h2>
        <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-center">
          Turn YouTube videos into summaries, LinkedIn posts, and Twitter threads instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <div
          className={
            `
            flex-1 rounded-full transition-all duration-300
            ${focused
              ? 'shadow-[0_0_40px_rgba(124,58,237,0.18)] ring-2 ring-accent-500/30'
              : 'shadow-[0_20px_50px_rgba(0,0,0,0.18)]'
            }
          `
          }
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste a YouTube URL here..."
            disabled={loading}
            className={
              'w-full px-6 sm:px-8 py-5 sm:py-6 '
              + 'min-h-[4.5rem] '
              + 'bg-dark-800/90 backdrop-blur-xl '
              + 'border border-dark-700/50 '
              + 'rounded-full '
              + 'text-text-primary text-base sm:text-lg '
              + 'placeholder:text-text-muted '
              + 'focus:outline-none focus:border-accent-500/60 '
              + 'disabled:opacity-50 disabled:cursor-not-allowed '
              + 'transition-all duration-300 '
              + (!isValid ? 'border-rose-500/50' : '')
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="w-full sm:w-auto flex-none inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-8 min-h-[4.5rem] rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <HiArrowPath className="w-5 h-5 animate-spin mr-2" />
              <span>Generating...</span>
            </>
          ) : (
            <span>Generate</span>
          )}
        </button>

        {!isValid && (
          <p className="mt-2 sm:mt-0 text-sm text-rose-400 animate-[fadeIn_0.2s_ease-in]">
            Please enter a valid YouTube URL (youtube.com or youtu.be)
          </p>
        )}
      </form>
    </section>
  );
}
