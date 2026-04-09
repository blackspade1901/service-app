interface WireframeButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function WireframeButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  className = ""
}: WireframeButtonProps) {
  const variantStyles = {
    primary: 'bg-black text-white',
    secondary: 'bg-white text-black border-2 border-black',
    ghost: 'bg-white text-black border border-gray-400'
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button 
      onClick={onClick}
      className={`font-mono ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
