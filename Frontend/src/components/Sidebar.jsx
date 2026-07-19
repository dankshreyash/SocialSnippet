import { useState } from 'react';
import {
  HiBars3,
  HiXMark,
  HiPlus,
  HiTrash,
  HiClock,
} from 'react-icons/hi2';
import { groupEntriesByDate } from '../utils/historyStorage';

export default function Sidebar({
  entries,
  activeEntryId,
  onSelectEntry,
  onDeleteEntry,
  onNewChat,
  isOpen,
  onToggle,
}) {
  const grouped = groupEntriesByDate(entries);
  const groupOrder = ['Today', 'Yesterday', 'Previous 7 Days', 'Older'];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          flex-shrink-0 bg-dark-900/95 backdrop-blur-xl border-r border-dark-700/50
          flex flex-col
          transition-all duration-300 ease-in-out
          
          /* Always fixed overlay (Drawer mode) */
          fixed inset-y-0 left-0 z-[60] w-72
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Inner container to maintain content width during transition */}
        <div className="w-72 h-full flex flex-col">
        {/* Header */}
        <div className="px-4 pt-10 pb-4 border-b border-dark-700/50 flex items-center gap-2">
          <button
            onClick={onNewChat}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold text-sm hover:from-accent-400 hover:to-accent-500 hover:shadow-lg hover:shadow-accent-500/25 active:scale-[0.98] transition-all duration-300"
          >
            <HiPlus className="w-4 h-4" />
            New Generation
          </button>
          
          <button
            onClick={onToggle}
            className="p-3 rounded-xl text-text-secondary hover:bg-dark-800 flex-shrink-0"
            title="Close sidebar"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* History list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 sidebar-scroll">
          {entries.length === 0 ? (
            <div className="text-center py-12 px-4">
              <HiClock className="w-8 h-8 text-text-muted mx-auto mb-3 opacity-50" />
              <p className="text-sm text-text-muted">No history yet</p>
              <p className="text-xs text-text-muted/60 mt-1">
                Generate content to see it here
              </p>
            </div>
          ) : (
            groupOrder.map((group) => {
              const items = grouped[group];
              if (!items || items.length === 0) return null;
              return (
                <div key={group}>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 mb-2">
                    {group}
                  </h3>
                  <div className="space-y-1">
                    {items.map((entry) => (
                      <HistoryItem
                        key={entry.id}
                        entry={entry}
                        isActive={entry.id === activeEntryId}
                        onSelect={() => onSelectEntry(entry.id)}
                        onDelete={() => onDeleteEntry(entry.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700/50">
          <p className="text-[10px] text-text-muted/50 text-center">
            {entries.length} generation{entries.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        </div>
      </aside>
    </>
  );
}

function HistoryItem({ entry, isActive, onSelect, onDelete }) {
  const [hovered, setHovered] = useState(false);

  const time = new Date(entry.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Truncate the summary for preview
  const preview = entry.summary
    ? entry.summary.slice(0, 60) + (entry.summary.length > 60 ? '...' : '')
    : entry.title;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group relative flex items-start gap-2 px-3 py-2.5 rounded-xl cursor-pointer
        transition-all duration-200
        ${isActive
          ? 'bg-accent-500/15 border border-accent-500/25 text-text-primary'
          : 'hover:bg-dark-800/60 border border-transparent text-text-secondary hover:text-text-primary'
        }
      `}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate leading-snug">
          {preview}
        </p>
        <p className="text-[11px] text-text-muted mt-0.5">{time}</p>
      </div>

      {hovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 p-1.5 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          title="Delete"
        >
          <HiTrash className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
