'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { Topology, GeometryCollection } from 'topojson-specification'

interface WorldMapProps {
  latitude: number
  longitude: number
}

export default function WorldMap({ latitude, longitude }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 400
    const height = 200
    const projection = d3.geoEquirectangular().scale(60).translate([width / 2, height / 2])
    const path = d3.geoPath().projection(projection)

    svg.selectAll("*").remove()

    d3.json<Topology<{ countries: GeometryCollection }>>(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    ).then((topology) => {
      if (!topology) return

      const countries = feature(topology, topology.objects.countries)

      svg.append("g")
        .selectAll("path")
        .data(countries.features)
        .enter().append("path")
        .attr("d", path as any)
        .attr("fill", "#1F2937")
        .attr("stroke", "#4B5563")

      svg.append("circle")
        .attr("cx", projection([longitude, latitude])?.[0])
        .attr("cy", projection([longitude, latitude])?.[1])
        .attr("r", 5)
        .attr("fill", "#EF4444")
    })
  }, [latitude, longitude])

  return (
    <Card className="bg-black border-emerald-400/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-normal text-emerald-400/60">GPS Location</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <svg ref={svgRef} width="100%" height="200" viewBox="0 0 400 200" />
        <div className="text-sm font-bold tabular-nums text-emerald-400 mt-2">
          Lat: {latitude.toFixed(4)}°, Long: {longitude.toFixed(4)}°
        </div>
      </CardContent>
    </Card>
  )
}

