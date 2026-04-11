// src/components/MapInner.tsx — FULL REPLACEMENT
'use client'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect } from 'react'

// Fix broken default marker icons in webpack/turbopack builds
const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: '/leaflet/marker-icon.png',
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    shadowUrl: '/leaflet/marker-shadow.png',
  })
}

interface Provider {
  id: number
  name: string
  service: string
  lat: number
  lng: number
  available: boolean
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
      {providers.map((provider) => (
        <Marker key={provider.id} position={[provider.lat, provider.lng]}>
          <Popup>
            <strong>{provider.name}</strong><br />
            {provider.service}<br />
            <span style={{ color: provider.available ? 'green' : 'gray' }}>
              {provider.available ? 'Available' : 'Busy'}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}