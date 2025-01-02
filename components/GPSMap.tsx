'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface GPSMapProps {
  latitude: number
  longitude: number
}

export default function GPSMap({ latitude, longitude }: GPSMapProps) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 2)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapRef.current)
    }

    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 3)
      L.marker([latitude, longitude]).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [latitude, longitude])

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-normal text-primary/60">GPS Location</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div id="map" style={{ height: '300px', width: '100%' }} />
        <div className="text-sm font-bold tabular-nums text-primary p-2 text-center border-t border-primary/20">
          Latitude: {latitude.toFixed(4)}° | Longitude: {longitude.toFixed(4)}°
        </div>
      </CardContent>
    </Card>
  )
}

