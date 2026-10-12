export default function Loading() {
  return (
    <main
      role="status"
      aria-label="তথ্য লোড হচ্ছে"
      className="mx-auto max-w-6xl px-4 py-6 sm:py-8"
    >
      <div className="skeleton h-28 rounded-2xl" />

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="skeleton h-5 w-40" />
        <div className="skeleton h-8 w-44" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton h-36 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
