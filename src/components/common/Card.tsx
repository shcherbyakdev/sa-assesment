interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      {title && <h2 className="text-xl text-gray-600 mb-4">{title}</h2>}
      {children}
    </div>
  );
};
