import React from "react";
import { Skeleton } from "../common/Skeleton";

export interface RowProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  underline?: boolean;
}

export const QantRankingRow: React.FC<RowProps> = ({
  label,
  children,
  className = "",
  isLoading = false,
  underline = true,
}) => {
  const rowClasses = `grid grid-cols-2 text-sm py-3 px-4 text-gray-700 ${
    underline ? "border-b border-gray-200" : ""
  }  ${className}`;

  if (isLoading) {
    return (
      <div className={rowClasses}>
        <Skeleton className="h-4 w-1/2 mr-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  return (
    <div className={rowClasses}>
      <span>{label}</span>
      <span className="text-blue-500">{children}</span>
    </div>
  );
};
