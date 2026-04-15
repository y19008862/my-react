const LoaderSkeleton = ({ count = 8, className = '' }: { count?: number; className?: string }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] rounded-2xl bg-cream-dark" />
          <div className="mt-4 space-y-2.5 px-1">
            <div className="h-3 bg-cream-dark rounded-full w-16" />
            <div className="h-4 bg-cream-dark rounded-full w-3/4" />
            <div className="h-5 bg-cream-dark rounded-full w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoaderSkeleton;
