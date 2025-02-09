interface StatRowProps {
  label: string;
  value: string | number;
  valueColor?: string;
}

export const StatRow = ({
  label,
  value,
  valueColor = "text-blue-600",
}: StatRowProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className={valueColor}>{label}</span>
      <span className={valueColor}>{value}</span>
    </div>
  );
};
