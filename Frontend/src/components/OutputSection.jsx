import SummaryCard from './SummaryCard';
import LinkedInCard from './LinkedInCard';
import TwitterCard from './TwitterCard';

export default function OutputSection({ data }) {
  if (!data) return null;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-32 sm:mt-40 mb-16 animate-[fadeIn_0.5s_ease-in] flex flex-col items-center">
      <div className="flex items-center gap-3 mb-16 w-full">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest">
          Generated Content
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center w-full">
        <SummaryCard content={data.summary} />
        <LinkedInCard content={data.linkedin} />
        <TwitterCard content={data.twitter} />
      </div>
    </section>
  );
}
