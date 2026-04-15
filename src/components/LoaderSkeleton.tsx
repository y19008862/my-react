import { memo } from 'react';

const LoaderSkeleton = memo(({ count = 8, className = '' }: { count?: number; className?: string }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[3/4] rounded-2xl bg-cream-dark animate-pulse-soft" />
          <div className="mt-4 space-y-3 px-0.5">
            <div className="h-2.5 bg-cream-dark rounded-full w-14 animate-pulse-soft" />
            <div className="h-3.5 bg-cream-dark rounded-full w-3/4 animate-pulse-soft" />
            <div className="h-4 bg-cream-dark rounded-full w-1/3 animate-pulse-soft" />
          </div>
        </div>
      ))}
    </div>
  );
});

LoaderSkeleton.displayName = 'LoaderSkeleton';

export default LoaderSkeleton;
