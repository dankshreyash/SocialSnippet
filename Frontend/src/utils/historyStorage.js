const STORAGE_KEY = 'ai_repurposer_history';

/**
 * Generate a unique ID for each history entry.
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/**
 * Extract a readable title from a YouTube URL.
 */
function extractTitle(url) {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
    return `YouTube Video (${videoId})`;
  } catch {
    return 'YouTube Video';
  }
}

/**
 * Get all history entries from localStorage, sorted newest first.
 */
export function getEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const entries = JSON.parse(raw);
    return entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch {
    return [];
  }
}

/**
 * Get a single entry by ID.
 */
export function getEntryById(id) {
  const entries = getEntries();
  return entries.find((e) => e.id === id) || null;
}

/**
 * Save a new entry to history and return its ID.
 */
export function saveEntry({ url, summary, linkedin, twitter }) {
  const entries = getEntries();
  const entry = {
    id: generateId(),
    url,
    title: extractTitle(url),
    summary,
    linkedin,
    twitter,
    createdAt: new Date().toISOString(),
  };
  entries.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entry;
}

/**
 * Delete an entry by ID.
 */
export function deleteEntry(id) {
  const entries = getEntries().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Group entries by date category: Today, Yesterday, Previous 7 Days, Older.
 */
export function groupEntriesByDate(entries) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const groups = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    Older: [],
  };

  entries.forEach((entry) => {
    const entryDate = new Date(entry.createdAt);
    if (entryDate >= today) {
      groups['Today'].push(entry);
    } else if (entryDate >= yesterday) {
      groups['Yesterday'].push(entry);
    } else if (entryDate >= weekAgo) {
      groups['Previous 7 Days'].push(entry);
    } else {
      groups['Older'].push(entry);
    }
  });

  return groups;
}
