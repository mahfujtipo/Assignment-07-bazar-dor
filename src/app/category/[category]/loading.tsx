export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        {/* Category Header Skeleton */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fbfcfb] p-6 shadow-sm">
          <div className="h-16 w-16 shrink-0 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Sort Bar Skeleton */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-[#fbfcfb] p-4 shadow-sm">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-10 w-44 rounded-xl bg-gray-200" />
        </div>

        {/* Product Count Skeleton */}
        <div className="my-4 h-4 w-36 rounded bg-gray-200" />

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="h-36 rounded-xl bg-gray-200" />

              <div className="mt-4 space-y-3">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-6 w-2/5 rounded bg-gray-200" />
                <div className="h-10 rounded-xl bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
