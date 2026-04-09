interface WireframeBoxProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  height?: string;
  border?: boolean;
}

export function WireframeBox({ 
  children, 
  className = "", 
  label, 
  height,
  border = true 
}: WireframeBoxProps) {
  return (
    <div 
      className={`${border ? 'border-2 border-black' : ''} ${className}`}
      style={{ height }}
    >
      {label && (
        <div className="text-xs font-mono p-2 border-b-2 border-black bg-gray-100">
          [{label}]
        </div>
      )}
      {children}
    </div>
  );
}
