import { Skeleton } from "@/components/ui/skeleton";

// Approximates the masonry grid with 6 placeholder cards of varying heights
const SKELETON_HEIGHTS = [
  "h-64", "h-80", "h-72",
  "h-80", "h-64", "h-72",
];

export function PortfolioSkeleton() {
  return (
    <div
      className="columns-1 sm:columns-2 lg:columns-3 gap-[var(--spacing-stack-lg)]"
      aria-busy="true"
      aria-label="Loading portfolio images"
    >
      {SKELETON_HEIGHTS.map((h, i) => (
        <div key={i} className="mb-[var(--spacing-stack-lg)] break-inside-avoid">
          <Skeleton className={`w-full ${h}`} aria-label={`Loading image ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}
