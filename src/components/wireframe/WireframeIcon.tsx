interface WireframeIconProps {
  size?: number;
  label?: string;
}

export function WireframeIcon({ size = 24, label = "ICON" }: WireframeIconProps) {
  return (
    <div 
      className="border-2 border-black flex items-center justify-center bg-white"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <span className="text-[8px] font-mono">{label}</span>
    </div>
  );
}
