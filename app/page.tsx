'use client'

import { useState, useEffect } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import Header from '@/components/Header'
import TelemetryGrid from '@/components/TelemetryGrid'
import RocketOrientation from '@/components/RocketOrientation'
import GPSMap from '@/components/GPSMap'
import CommandControl from '@/components/CommandControl'
import StatusBar from '@/components/StatusBar'
import TrajectoryCard from '@/components/TrajectoryCard'
import EventTracker from '@/components/EventTracker'
import { generateTelemetryData } from '@/lib/telemetry'
import MissionProgress from '@/components/MissionProgress'

const initialParameters = [
  { id: 'altitude', title: 'Altitude', unit: 'km' },
  { id: 'velocity', title: 'Velocity', unit: 'm/s' },
  { id: 'temperature', title: 'Temperature', unit: '°C' },
  { id: 'pressure', title: 'Pressure', unit: 'kPa' },
  { id: 'gyroscope', title: 'Gyroscope', unit: '°/s', size: 'large' as const },
  { id: 'accelerometer', title: 'Accelerometer', unit: 'm/s²', size: 'large' as const },
]

export default function RocketMonitoringSystem() {
  const [parameters, setParameters] = useState(initialParameters)
  const [telemetryData, setTelemetryData] = useState<Record<string, number[] | { x: number; y: number; z: number }[]>>({})
  const [gpsLocation, setGpsLocation] = useState({ latitude: 0, longitude: 0 })
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData(prev => {
        const newData = { ...prev }
        parameters.forEach(param => {
          const currentData = newData[param.id] || []
          if (param.id === 'gyroscope' || param.id === 'accelerometer') {
            const newValue = {
              x: generateTelemetryData(param.id),
              y: generateTelemetryData(param.id),
              z: generateTelemetryData(param.id),
            }
            newData[param.id] = [...(currentData as { x: number; y: number; z: number }[]), newValue].slice(-20)
          } else {
            const newValue = generateTelemetryData(param.id)
            newData[param.id] = [...(currentData as number[]), newValue].slice(-20)
          }
        })
        return newData
      })

      setGpsLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.1,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.1,
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [parameters])

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setParameters((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-primary font-mono flex flex-col">
      <Header missionName="Lotus" />
      
      <main className="flex-grow container mx-auto py-6">
        <div className="grid grid-cols-1 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={parameters} strategy={rectSortingStrategy}>
              <TelemetryGrid parameters={parameters} telemetryData={telemetryData} />
            </SortableContext>
          </DndContext>
          
          <div className="mt-6">
            <MissionProgress />
          </div>
          
          <RocketOrientation />
          <GPSMap latitude={gpsLocation.latitude} longitude={gpsLocation.longitude} />
          <TrajectoryCard />
          <EventTracker />
          <CommandControl />
        </div>
      </main>

      <StatusBar />
    </div>
  )
}

