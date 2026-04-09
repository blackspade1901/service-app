interface WireframeSelectProps {
  label?: string;
  placeholder?: string;
  options?: string[];
  className?: string;
}

export function WireframeSelect({ 
  label, 
  placeholder = "Select option",
  options = ["Option 1", "Option 2", "Option 3"],
  className = ""
}: WireframeSelectProps) {
  return (
    <div className={className}>
      {label && (
        <div className="text-xs font-mono mb-1">[{label}]</div>
      )}
      <div className="border-2 border-black px-3 py-2 bg-white flex justify-between items-center">
        <span className="text-sm font-mono text-gray-400">{placeholder}</span>
        <span className="text-sm font-mono">▼</span>
      </div>
    </div>
  );
}
