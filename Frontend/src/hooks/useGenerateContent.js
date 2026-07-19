import { useState, useEffect } from 'react';
import { generateContent } from '../services/api';
import { isValidYouTubeUrl } from '../utils/validators';
import toast from 'react-hot-toast';
import { saveEntry, getEntryById, getEntries } from '../utils/historyStorage';

export function useGenerateContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeEntryId, setActiveEntryId] = useState(null);
  const [entries, setEntries] = useState([]);

  // Load history on mount
  useEffect(() => {
    const history = getEntries();
    setEntries(history);
    
    // Optionally load the most recent one if it exists
    if (history.length > 0) {
      setData({
        summary: history[0].summary,
        linkedin: history[0].linkedin,
        twitter: history[0].twitter
      });
      setActiveEntryId(history[0].id);
    }
  }, []);

  async function generate(url) {
    if (!isValidYouTubeUrl(url)) {
      const msg = 'Please enter a valid YouTube URL.';
      setError(msg);
      toast.error(msg, {
        style: {
          background: '#1a1a2e',
          color: '#f1f5f9',
          border: '1px solid rgba(244, 63, 94, 0.3)',
        },
      });
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setActiveEntryId(null);

    try {
      const result = await generateContent(url);
      setData(result);
      
      // Save to history
      const newEntry = saveEntry({
        url,
        summary: result.summary,
        linkedin: result.linkedin,
        twitter: result.twitter
      });
      
      setEntries(getEntries());
      setActiveEntryId(newEntry.id);
      
      toast.success('Content generated successfully!', {
        duration: 3000,
        style: {
          background: '#1a1a2e',
          color: '#f1f5f9',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        },
        iconTheme: {
          primary: '#10b981',
          secondary: '#f1f5f9',
        },
      });
    } catch (err) {
      const message = err.message || 'Something went wrong.';
      setError(message);
      toast.error(message, {
        duration: 5000,
        style: {
          background: '#1a1a2e',
          color: '#f1f5f9',
          border: '1px solid rgba(244, 63, 94, 0.3)',
        },
      });
    } finally {
      setLoading(false);
    }
  }

  function loadEntry(id) {
    const entry = getEntryById(id);
    if (entry) {
      setData({
        summary: entry.summary,
        linkedin: entry.linkedin,
        twitter: entry.twitter
      });
      setActiveEntryId(entry.id);
      setError(null);
    }
  }

  function reset() {
    setData(null);
    setError(null);
    setLoading(false);
    setActiveEntryId(null);
  }

  function refreshEntries() {
    setEntries(getEntries());
  }

  return { 
    data, 
    loading, 
    error, 
    generate, 
    reset, 
    entries, 
    activeEntryId, 
    loadEntry,
    refreshEntries
  };
}
