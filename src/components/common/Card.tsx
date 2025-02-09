interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
