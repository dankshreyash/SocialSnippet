import { HiExclamationTriangle, HiXMark } from 'react-icons/hi2';

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mt-6 animate-[fadeIn_0.3s_ease-in]">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
        <HiExclamationTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-rose-300 flex-1 leading-relaxed">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded-lg text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <HiXMark className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
