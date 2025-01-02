'use client'

import { useState, useEffect } from 'react'
import TelemetryCard from './TelemetryCard'

const initialTelemetryData = [
  { id: 'altitude', title: 'Altitude', value: 0, unit: 'km' },
  { id: 'velocity', title: 'Velocity', value: 0, unit: 'm/s' },
  { id: 'temperature', title: 'Temperature', value: 0, unit: '°C' },
  { id: 'pressure', title: 'Pressure', value: 0, unit: 'kPa' },
]

const TelemetryDashboard = () => {
  const [telemetryData, setTelemetryData] = useState(initialTelemetryData)

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData(prevData =>
        prevData.map(item => ({
          ...item,
          value: Math.random() * 100
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {telemetryData.map((item) => (
        <TelemetryCard key={item.id} {...item} />
      ))}
    </div>
  )
}

export default TelemetryDashboard

