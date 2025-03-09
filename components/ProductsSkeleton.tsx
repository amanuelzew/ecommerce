export function ProductsSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-80"></div>
          ))}
      </div>
    )
  }
  
  