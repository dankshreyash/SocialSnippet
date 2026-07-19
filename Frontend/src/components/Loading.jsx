export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent-500/10 border border-accent-500/20">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-bounce [animation-delay:300ms]" />
          </div>
          <span className="text-sm font-medium text-accent-300">
            Generating content from transcript...
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-dark-700/50 bg-dark-800/40 p-6 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-28 bg-dark-600/50 rounded-lg" />
              <div className="h-7 w-16 bg-dark-600/50 rounded-lg" />
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-dark-600/40 rounded-full w-full" />
              <div className="h-3 bg-dark-600/40 rounded-full w-5/6" />
              <div className="h-3 bg-dark-600/40 rounded-full w-4/6" />
              <div className="h-3 bg-dark-600/40 rounded-full w-full" />
              <div className="h-3 bg-dark-600/40 rounded-full w-3/4" />
              <div className="h-3 bg-dark-600/40 rounded-full w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
