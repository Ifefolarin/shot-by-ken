interface SkeletonProps {
  className?: string;
  "aria-label"?: string;
}

export function Skeleton({ className = "", "aria-label": ariaLabel }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={ariaLabel ?? "Loading…"}
      aria-busy="true"
      className={`skeleton-shimmer ${className}`}
    />
  );
}
