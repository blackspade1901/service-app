import { Link, useLocation } from 'react-router-dom';
import { Home, User, FileText, Users, Heart, Calendar, Shield, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export function ScreenNavigator() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const screens = [
    { path: '/', name: 'Home (Map)', icon: Home },
    { path: '/auth', name: 'Auth', icon: User },
    { path: '/provider-registration', name: 'Provider Registration', icon: FileText },
    { path: '/customer-dashboard', name: 'Customer Dashboard', icon: Users },
    { path: '/provider-dashboard', name: 'Provider Dashboard', icon: MapPin },
    { path: '/provider-profile', name: 'Provider Profile', icon: User },
    { path: '/booking', name: 'Booking Flow', icon: Calendar },
    { path: '/favorites', name: 'Favorites', icon: Heart },
    { path: '/admin', name: 'Admin Panel', icon: Shield },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        aria-label="Toggle screen navigator"
      >
        {isOpen ? (
          <ChevronRight className="w-6 h-6" />
        ) : (
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Navigator Panel */}
      <div
        className={`
          fixed bottom-20 right-4 z-40 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0 pointer-events-none'}
        `}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-72 max-w-[calc(100vw-2rem)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              Wireframe Screens
            </h3>
          </div>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
            {screens.map((screen) => {
              const Icon = screen.icon;
              const isActive = location.pathname === screen.path;
              
              return (
                <Link
                  key={screen.path}
                  to={screen.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all font-medium
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{screen.name}</span>
                </Link>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
            📱 Toggle to view different screens
          </p>
        </div>
      </div>
    </>
  );
}
