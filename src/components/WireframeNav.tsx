import React from 'react';

interface WireframeNavProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  viewMode: 'desktop' | 'mobile';
  onViewModeChange: (mode: 'desktop' | 'mobile') => void;
}

export function WireframeNav({ currentScreen, onScreenChange, viewMode, onViewModeChange }: WireframeNavProps) {
  const screens = [
    { id: 'home', label: '1. Home Page', role: 'public' },
    { id: 'auth', label: '2. Authentication', role: 'public' },
    { id: 'provider-registration', label: '2b. Provider Registration', role: 'provider' },
    { id: 'customer-dashboard', label: '3. Customer Dashboard', role: 'customer' },
    { id: 'provider-dashboard', label: '4. Provider Dashboard', role: 'provider' },
    { id: 'provider-profile', label: '5. Provider Profile', role: 'public' },
    { id: 'booking-flow', label: '6. Booking Flow', role: 'customer' },
    { id: 'favorites', label: '7. Favorites', role: 'customer' },
    { id: 'admin-panel', label: '8. Admin Panel', role: 'admin' },
  ];

  const roleColors: Record<string, string> = {
    public: 'border-zinc-400',
    customer: 'border-zinc-500',
    provider: 'border-zinc-600',
    admin: 'border-zinc-700',
  };

  return (
    <nav className="border-b-2 border-black bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-mono">LOCAL SERVICE PROVIDER - WIREFRAMES</h1>
          <div className="flex gap-2 border-2 border-black">
            <button
              onClick={() => onViewModeChange('desktop')}
              className={`px-4 py-2 font-mono ${
                viewMode === 'desktop' ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              DESKTOP
            </button>
            <button
              onClick={() => onViewModeChange('mobile')}
              className={`px-4 py-2 font-mono border-l-2 border-black ${
                viewMode === 'mobile' ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              MOBILE
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => onScreenChange(screen.id)}
              className={`px-3 py-2 border-2 font-mono text-sm ${
                currentScreen === screen.id
                  ? 'bg-black text-white border-black'
                  : `bg-white text-black ${roleColors[screen.role]}`
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
