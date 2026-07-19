import { FaXTwitter } from 'react-icons/fa6';
import CopyButton from './CopyButton';

export default function TwitterCard({ content }) {
  if (!content) return null;

  const tweets = content
    .split(/\n\n---\n\n|\n---\n/)
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="group rounded-2xl border border-dark-700/50 bg-dark-800/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <FaXTwitter className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">Twitter Thread</h3>
          </div>
          <CopyButton text={content} label="Twitter Thread" />
        </div>

        <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin space-y-3">
          {tweets.length > 1 ? (
            tweets.map((tweet, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-dark-700/30 border border-dark-600/30 transition-colors hover:border-emerald-500/20"
              >
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {tweet}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          )}
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
