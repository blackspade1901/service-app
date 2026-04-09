import { Heart, Star, MapPin, DollarSign, Phone, Trash2, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const mockFavorites = [
  { id: 1, name: 'John Smith', service: 'Plumber', rating: 4.8, reviews: 124, price: 50, distance: '0.5 mi', available: true },
  { id: 2, name: 'Sarah Johnson', service: 'Electrician', rating: 4.9, reviews: 98, price: 60, distance: '0.8 mi', available: true },
  { id: 3, name: 'Emily Davis', service: 'Carpenter', rating: 4.9, reviews: 87, price: 55, distance: '1.5 mi', available: false },
  { id: 4, name: 'Mike Williams', service: 'Cleaner', rating: 4.7, reviews: 156, price: 40, distance: '1.2 mi', available: true },
  { id: 5, name: 'James Brown', service: 'Painter', rating: 4.6, reviews: 203, price: 45, distance: '2.1 mi', available: true },
];

export function FavoritesScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className={`mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-2xl shadow-lg shadow-pink-200 animate-pulse">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">My Vault</h1>
            </div>
            <p className="text-slate-500 font-bold text-lg ml-1">Elite network of trusted professionals</p>
          </div>
          
          <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-fuchsia-600 transition-all shadow-xl active:scale-90">
            <Sparkles className="w-4 h-4" />
            Discover New
          </button>
        </div>

        {/* Provider Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFavorites.map((provider, index) => (
            <div
              key={provider.id}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                perspective: '1000px'
              }}
              className={`
                group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden
                /* THE HOVER ZOOM OUT EFFECT */
                transition-all duration-500 ease-out
                hover:scale-[0.96] hover:shadow-[0_40px_80px_-15px_rgba(219,39,119,0.2)]
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              `}
            >
              {/* Card Hero */}
              <div className="relative h-36 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-700">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white hover:text-red-500 transition-all border border-white/20 group/heart">
                    <Heart className="w-5 h-5 fill-white group-hover/heart:fill-red-500" />
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-red-500 transition-all border border-white/20">
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="absolute -bottom-8 left-8 transition-transform duration-700 group-hover:scale-110">
                  <div className="w-20 h-20 rounded-3xl bg-slate-900 border-4 border-white shadow-2xl overflow-hidden p-1">
                     <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-pink-400" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 pt-12">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-black text-slate-900 text-2xl tracking-tight group-hover:text-fuchsia-600 transition-colors">
                      {provider.name}
                    </h3>
                    <p className="text-fuchsia-600 font-black text-[10px] uppercase tracking-[0.25em]">{provider.service}</p>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                    ${provider.available ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-slate-100 text-slate-400'}
                  `}>
                    {provider.available ? 'Active' : 'Idle'}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-8 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-fuchsia-500 text-fuchsia-500" />
                    <span className="font-black text-slate-800">{provider.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm tracking-tighter">{provider.distance}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">${provider.price}</span>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">/ Hr</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Link
                    to="/provider-profile"
                    className="px-4 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all text-center"
                  >
                    View
                  </Link>
                  <Link
                    to="/booking"
                    className="px-4 py-4 bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-fuchsia-200 transition-all text-center active:scale-95"
                  >
                    Deploy
                  </Link>
                </div>

                <button className="w-full mt-2 py-4 bg-white border-2 border-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:border-fuchsia-500 hover:text-fuchsia-600 transition-all flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Direct Line
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}