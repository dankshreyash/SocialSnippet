import { HiDocumentText } from 'react-icons/hi2';
import CopyButton from './CopyButton';

export default function SummaryCard({ content }) {
  if (!content) return null;

  return (
    <div className="group rounded-2xl border border-dark-700/50 bg-dark-800/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/5">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-500/15 flex items-center justify-center">
              <HiDocumentText className="w-4 h-4 text-accent-400" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">Summary</h3>
          </div>
          <CopyButton text={content} label="Summary" />
        </div>

        <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin">
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-accent-500 via-accent-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
