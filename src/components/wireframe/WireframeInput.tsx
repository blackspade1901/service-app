interface WireframeInputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  className?: string;
}

export function WireframeInput({ 
  placeholder = "Input field", 
  label,
  type = "text",
  className = ""
}: WireframeInputProps) {
  return (
    <div className={className}>
      {label && (
        <div className="text-xs font-mono mb-1">[{label}]</div>
      )}
      <div className="border-2 border-black px-3 py-2 bg-white">
        <span className="text-sm font-mono text-gray-400">{placeholder}</span>
      </div>
    </div>
  );
}
