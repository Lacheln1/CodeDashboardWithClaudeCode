interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`bg-bg-secondary border border-border rounded-xl p-6 shadow-lg transition-colors hover:border-accent ${className}`}
    >
      {children}
    </div>
  );
};
