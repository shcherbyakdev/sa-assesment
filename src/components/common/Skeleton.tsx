interface SkeletonProps {
  className?: string;
  width?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    aria-hidden="true"
  />
);
