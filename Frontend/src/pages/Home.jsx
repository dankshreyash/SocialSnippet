import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import UrlInput from '../components/UrlInput';
import OutputSection from '../components/OutputSection';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Sidebar from '../components/Sidebar';
import { useGenerateContent } from '../hooks/useGenerateContent';
import { deleteEntry } from '../utils/historyStorage';

export default function Home() {
  const { 
    data, 
    loading, 
    error, 
    generate, 
    reset,
    entries,
    activeEntryId,
    loadEntry,
    refreshEntries
  } = useGenerateContent();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleDeleteEntry(id) {
    deleteEntry(id);
    refreshEntries();
    if (activeEntryId === id) {
      reset();
    }
  }

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      <Toaster position="top-right" />
      
      <Sidebar 
        entries={entries}
        activeEntryId={activeEntryId}
        onSelectEntry={loadEntry}
        onDeleteEntry={handleDeleteEntry}
        onNewChat={reset}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Navbar 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onNewChat={reset}
        />

        <main className={`flex-1 flex flex-col px-4 transition-all duration-500 ${!data && !loading ? 'justify-center items-center text-center' : 'pt-16 pb-8 justify-start items-center'}`}>
          <div className={`w-full max-w-4xl mx-auto flex flex-col items-center transition-all duration-500 ${data ? 'mb-16 sm:mb-24' : ''}`}>
            <UrlInput onGenerate={generate} loading={loading} />
            <ErrorMessage message={error} onDismiss={reset} />
            {loading && <Loading />}
          </div>
          
          {!loading && data && <OutputSection data={data} />}
        </main>

        <footer className="py-6 text-center border-t border-dark-800/50 mt-auto">
          <p className="text-xs text-text-muted">
            Built with React, FastAPI & Groq AI
          </p>
        </footer>
      </div>
    </div>
  );
}
