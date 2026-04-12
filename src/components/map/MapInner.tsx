// src/components/MapInner.tsx — FULL REPLACEMENT
'use client'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect } from 'react'
import Link from 'next/link'

const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}

interface Provider {
  id: string
  full_name: string
  service_category: string | null
  avg_rating: number | null
  is_live: boolean
  lat: number | null
  lng: number | null
}

interface MapInnerProps {
  providers?: Provider[]
  center?: [number, number]
  zoom?: number
}

export default function MapInner({
  providers = [],
  center = [40.7580, -73.9855],
  zoom = 13,
}: MapInnerProps) {
  useEffect(() => {
    fixLeafletIcons()
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {providers.filter(p => p.lat && p.lng).map((provider) => (
        <Marker key={provider.id} position={[provider.lat!, provider.lng!]}>
          <Popup>
            <strong>{provider.full_name}</strong><br />
            {provider.service_category}<br />
            {provider.avg_rating && <span>★ {provider.avg_rating.toFixed(1)}</span>}<br />
            <span style={{ color: provider.is_live ? 'green' : 'gray' }}>
              {provider.is_live ? 'Available' : 'Busy'}
            </span>
            <br />
            <Link href={`/provider/${provider.id}`} style={{ color: '#9333ea', fontWeight: 'bold' }}>
              View Profile
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}