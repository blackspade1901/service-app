// src/components/ServiceMap.tsx
'use client'
import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('./MapInner'),  // The actual leaflet component
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
  }
)

export default function ServiceMap(props: MapProps) {
  return <Map {...props} />
}