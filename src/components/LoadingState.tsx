import React from "react";
export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100"
        >
          <div className="aspect-[4/3] bg-stone-200 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-20 bg-stone-200 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-stone-200 rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-stone-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
export function LoadingDetail() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 w-32 bg-stone-200 rounded mb-8" />
      <div className="h-12 w-3/4 bg-stone-200 rounded mb-6" />
      <div className="aspect-video w-full bg-stone-200 rounded-2xl mb-8" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="h-8 w-1/2 bg-stone-200 rounded" />
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-stone-200 rounded" />
          ))}
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="h-8 w-1/3 bg-stone-200 rounded" />
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-stone-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
