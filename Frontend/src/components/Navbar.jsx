import { HiSparkles, HiBars3, HiXMark, HiPlus } from 'react-icons/hi2';

export default function Navbar({ isSidebarOpen, onToggleSidebar, onNewChat }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark-950/70 border-b border-dark-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-dark-800 transition-colors"
            title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <HiXMark className="w-5 h-5" /> : <HiBars3 className="w-5 h-5" />}
          </button>
          
          <div className="relative hidden sm:block">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-accent-500/25">
              <HiSparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-cyan-500 blur-lg opacity-40 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
              SocialSnippet
            </h1>
            <p className="text-xs text-text-muted hidden sm:block">
              Transform YouTube videos into engaging content
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent-500/10 text-accent-400 hover:bg-accent-500/20 border border-accent-500/20 transition-all font-medium text-sm"
          >
            <HiPlus className="w-4 h-4" />
            <span className="hidden sm:inline">New Generation</span>
            <span className="sm:hidden">New</span>
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Powered by Llama
          </span>
        </div>
      </div>
    </nav>
  );
}
