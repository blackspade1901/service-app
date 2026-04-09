import React from 'react';

export function WireframeBox({ 
  children, 
  className = "", 
  label,
  dashed,
  height
}: { 
  children?: React.ReactNode; 
  className?: string;
  label?: string;
  dashed?: boolean;
  height?: string;
}) {
  return (
    <div className={`border-2 ${dashed ? 'border-dashed border-zinc-400' : 'border-black'} p-4 font-mono ${height || ''} ${className}`}>
      {label && <div className="text-xs mb-2 font-bold bg-black text-white inline-block px-2 py-1">{label}</div>}
      {children}
    </div>
  );
}

export function WireframeCard({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white ${className}`}>
      {children}
    </div>
  );
}

export function WireframeText({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono uppercase tracking-tight ${className}`}>
      {children}
    </p>
  );
}

export function WireframeButton({ 
  children, 
  variant = "primary", 
  secondary,
  onClick, 
  className = "" 
}: { 
  children?: React.ReactNode; 
  variant?: "primary" | "secondary" | "outline"; 
  secondary?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const isSecondary = secondary || variant === "secondary";
  const styles = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border-2 border-black hover:bg-zinc-100",
    outline: "bg-white text-black border-2 border-black hover:bg-zinc-100"
  };

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 font-mono font-bold uppercase transition-colors ${isSecondary ? styles.secondary : styles.primary} ${className}`}
    >
      {children}
    </button>
  );
}

export function WireframeInput({ 
  placeholder, 
  className = "", 
  type = "text" 
}: { 
  placeholder?: string; 
  className?: string;
  type?: string;
}) {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      className={`w-full border-2 border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${className}`}
    />
  );
}

export function WireframeMapPin({ number }: { number: number }) {
  return (
    <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full font-mono font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] border-2 border-white text-xs">
      {number}
    </div>
  );
}

export function WireframeImageBox({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`border-2 border-dashed border-zinc-400 bg-zinc-50 flex items-center justify-center ${className}`}>
      {children || <span className="text-zinc-400 font-mono text-xs">IMG</span>}
    </div>
  );
}