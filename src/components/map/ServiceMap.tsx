// src/components/ServiceMap.tsx — FULL REPLACEMENT
'use client'
import dynamic from 'next/dynamic'

interface Provider {
  id: number
  name: string
  service: string
  lat: number
  lng: number
  available: boolean
}

interface MapProps {
  providers?: Provider[]
  center?: [number, number]
  zoom?: number
}

const Map = dynamic(
  () => import('./MapInner'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-purple-50 animate-pulse rounded-lg flex items-center justify-center">
        <p className="text-purple-400 text-sm font-medium">Loading map...</p>
      </div>
    )
  }
)

export default function ServiceMap(props: MapProps) {
  return <Map {...props} />
}