interface WireframeImageProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function WireframeImage({ 
  width = "100%", 
  height = "200px", 
  label = "IMAGE",
  className = ""
}: WireframeImageProps) {
  return (
    <div 
      className={`border-2 border-black bg-gray-100 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="text-xs font-mono">[{label}]</div>
        <div className="text-[10px] font-mono text-gray-400 mt-1">
          {width} × {height}
        </div>
      </div>
    </div>
  );
}
