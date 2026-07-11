import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PageLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse w-full">
      {/* Page header skeleton */}
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      {/* Content skeleton - grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border p-6 rounded-3xl flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="space-y-3 flex-1 mt-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
