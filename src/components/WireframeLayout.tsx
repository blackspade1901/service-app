import { Link, useLocation } from 'react-router-dom';
import { WireframeBox } from './WireframeBox';

interface WireframeLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  userRole?: 'customer' | 'provider' | 'admin' | null;
}

export function WireframeLayout({ children, showNav = true, userRole = null }: WireframeLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {showNav && (
        <nav className="border-b-4 border-black p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-mono font-bold">
              [LOCAL SERVICE FINDER]
            </Link>
            
            <div className="flex gap-4 items-center">
              <Link 
                to="/" 
                className={`font-mono uppercase text-sm hover:underline ${location.pathname === '/' ? 'font-bold' : ''}`}
              >
                Home
              </Link>
              
              {!userRole && (
                <Link 
                  to="/auth" 
                  className={`font-mono uppercase text-sm hover:underline ${location.pathname === '/auth' ? 'font-bold' : ''}`}
                >
                  Login
                </Link>
              )}
              
              {userRole === 'customer' && (
                <>
                  <Link 
                    to="/customer/dashboard" 
                    className={`font-mono uppercase text-sm hover:underline ${location.pathname.includes('/customer') ? 'font-bold' : ''}`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/customer/favorites" 
                    className={`font-mono uppercase text-sm hover:underline ${location.pathname === '/customer/favorites' ? 'font-bold' : ''}`}
                  >
                    Favorites
                  </Link>
                </>
              )}
              
              {userRole === 'provider' && (
                <Link 
                  to="/provider/dashboard" 
                  className={`font-mono uppercase text-sm hover:underline ${location.pathname.includes('/provider') ? 'font-bold' : ''}`}
                >
                  Dashboard
                </Link>
              )}
              
              {userRole === 'admin' && (
                <Link 
                  to="/admin/dashboard" 
                  className={`font-mono uppercase text-sm hover:underline ${location.pathname.includes('/admin') ? 'font-bold' : ''}`}
                >
                  Admin Panel
                </Link>
              )}
              
              {userRole && (
                <div className="border-2 border-black px-3 py-1 font-mono text-xs uppercase">
                  [{userRole}]
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
      
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
