interface WireframeCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function WireframeCard({ children, className = "", title }: WireframeCardProps) {
  return (
    <div className={`border-2 border-black bg-white p-4 ${className}`}>
      {title && (
        <div className="font-mono text-sm mb-3 pb-2 border-b-2 border-black">
          [{title}]
        </div>
      )}
      {children}
    </div>
  );
}
