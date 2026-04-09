interface WireframeMapProps {
  height?: string;
  showPins?: boolean;
  pinCount?: number;
}

export function WireframeMap({ height = "600px", showPins = true, pinCount = 5 }: WireframeMapProps) {
  const pins = Array.from({ length: pinCount }, (_, i) => ({
    id: i,
    top: Math.random() * 70 + 10,
    left: Math.random() * 70 + 10
  }));

  return (
    <div 
      className="border-2 border-black bg-gray-50 relative"
      style={{ height }}
    >
      {/* Map grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-400" />
          ))}
        </div>
      </div>
      
      {/* Center label */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center">
          <div className="text-lg font-mono">[MAP VIEW]</div>
          <div className="text-xs font-mono text-gray-500 mt-1">Interactive Map Component</div>
        </div>
      </div>

      {/* Location pins */}
      {showPins && pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute w-6 h-6 bg-black border-2 border-white rounded-full flex items-center justify-center"
          style={{ top: `${pin.top}%`, left: `${pin.left}%` }}
        >
          <div className="text-white text-[8px] font-mono">P</div>
        </div>
      ))}

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center font-mono">+</div>
        <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center font-mono">−</div>
      </div>
    </div>
  );
}
