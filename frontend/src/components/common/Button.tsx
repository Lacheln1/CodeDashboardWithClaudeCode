interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseClass = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer';
  const variantClass =
    variant === 'primary'
      ? 'bg-gradient-to-r from-accent to-accent-hover text-white hover:brightness-110'
      : 'bg-bg-secondary border border-border text-text-primary hover:bg-bg-tertiary';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
