'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// @ts-ignore: TypeScript doesn't understand CSS imports natively
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ProviderData } from './HomePageClient';
import Link from 'next/link';
import { Star } from 'lucide-react';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  providers: ProviderData[];
}

// FIX: Changed name to LeafletMap to avoid JS 'Map' collision
export default function LeafletMap({ providers }: MapProps) {
  const defaultCenter: [number, number] = providers.length > 0 && providers[0].lat && providers[0].lng 
    ? [providers[0].lat, providers[0].lng] 
    : [15.2993, 74.1240];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={10} 
      className="w-full h-full z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {providers.map((provider) => (
        provider.lat && provider.lng ? (
          <Marker 
            key={provider.id} 
            position={[provider.lat, provider.lng]}
            icon={customIcon}
          >
            <Popup className="rounded-xl">
              <div className="p-1 min-w-37.5">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{provider.full_name}</h3>
                <p className="text-xs text-slate-600 mb-2">{provider.service_category || 'Service Provider'}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-slate-700">
                    {provider.avg_rating?.toFixed(1) ?? 'N/A'}
                  </span>
                </div>
                <Link href={`/provider/${provider.id}`}>
                  <button className="w-full px-3 py-1.5 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all">
                    View Profile
                  </button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
}