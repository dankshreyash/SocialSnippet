import toast from 'react-hot-toast';

/**
 * Copy text to clipboard and show a toast notification.
 */
export async function copyToClipboard(text, label = 'Content') {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: '#f1f5f9',
        border: '1px solid rgba(124, 58, 237, 0.3)',
      },
      iconTheme: {
        primary: '#7c3aed',
        secondary: '#f1f5f9',
      },
    });
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      toast.success(`${label} copied to clipboard!`, {
        duration: 2000,
        style: {
          background: '#1a1a2e',
          color: '#f1f5f9',
          border: '1px solid rgba(124, 58, 237, 0.3)',
        },
      });
    } catch {
      toast.error('Failed to copy. Please try again.', {
        style: {
          background: '#1a1a2e',
          color: '#f1f5f9',
          border: '1px solid rgba(244, 63, 94, 0.3)',
        },
      });
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
