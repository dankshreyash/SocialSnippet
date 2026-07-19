import { FaLinkedin } from 'react-icons/fa';
import CopyButton from './CopyButton';

export default function LinkedInCard({ content }) {
  if (!content) return null;

  return (
    <div className="group rounded-2xl border border-dark-700/50 bg-dark-800/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
              <FaLinkedin className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">LinkedIn Post</h3>
          </div>
          <CopyButton text={content} label="LinkedIn Post" />
        </div>

        <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin">
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
