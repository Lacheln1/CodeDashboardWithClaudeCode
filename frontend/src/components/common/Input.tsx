interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm text-text-secondary mb-2">{label}</label>}
      <input
        className={`w-full h-11 px-4 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
};
