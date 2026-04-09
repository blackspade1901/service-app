interface WireframeCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

export function WireframeCheckbox({ label, checked = false, onChange }: WireframeCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <div 
        className="w-5 h-5 border-2 border-black bg-white cursor-pointer flex items-center justify-center"
        onClick={onChange}
      >
        {checked && <div className="w-3 h-3 bg-black" />}
      </div>
      <span className="text-sm font-mono">{label}</span>
    </div>
  );
}
