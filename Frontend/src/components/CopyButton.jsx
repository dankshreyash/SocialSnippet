import { useState } from 'react';
import { HiClipboardDocument, HiCheck } from 'react-icons/hi2';
import { copyToClipboard } from '../utils/copy';

export default function CopyButton({ text, label = 'Content' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(text, label);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5
        rounded-lg text-xs font-medium
        transition-all duration-300
        ${copied
          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
          : 'bg-dark-700/50 text-text-secondary border border-dark-600/50 hover:bg-dark-600/50 hover:text-text-primary hover:border-accent-500/30'
        }
      `}
      title={`Copy ${label}`}
    >
      {copied ? (
        <>
          <HiCheck className="w-3.5 h-3.5" />
          Copied!
        </>
      ) : (
        <>
          <HiClipboardDocument className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </button>
  );
}
