'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Progress } from "@/components/ui/progress"

interface TrajectoryData {
  time: number
  altitude: number
  velocity: number
  stage: number
}

const stages = [
  { name: 'Launch', duration: 120 },
  { name: 'Max-Q', duration: 60 },
  { name: 'MECO', duration: 180 },
  { name: 'Stage Separation', duration: 30 },
  { name: 'Second Stage Ignition', duration: 360 },
  { name: 'Orbit Insertion', duration: 180 },
  { name: 'Payload Deployment', duration: 60 },
  { name: 'De-orbit Burn', duration: 120 },
  { name: 'Atmospheric Entry', duration: 180 },
  { name: 'Landing', duration: 60 }
]

export default function TrajectoryCard() {
  const [trajectoryData, setTrajectoryData] = useState<TrajectoryData[]>([])
  const [currentStage, setCurrentStage] = useState(0)
  const [missionTime, setMissionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionTime(prev => prev + 1)
      setTrajectoryData(prev => {
        const newTime = (prev[prev.length - 1]?.time || 0) + 1
        const newAltitude = Math.min(400, (prev[prev.length - 1]?.altitude || 0) + Math.random() * 10)
        const newVelocity = Math.min(10000, (prev[prev.length - 1]?.velocity || 0) + Math.random() * 100)
        
        return [...prev, { 
          time: newTime, 
          altitude: newAltitude, 
          velocity: newVelocity,
          stage: currentStage
        }].slice(-60)
      })

      // Update current stage
      const totalTime = stages.reduce((sum, stage) => sum + stage.duration, 0)
      let accumulatedTime = 0
      for (let i = 0; i < stages.length; i++) {
        accumulatedTime += stages[i].duration
        if (missionTime < accumulatedTime) {
          setCurrentStage(i)
          break
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [currentStage, missionTime])

  const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0)
  const progress = (missionTime / totalDuration) * 100

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-primary/60">Trajectory & Stage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trajectoryData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'hsl(var(--primary))', fontSize: 10 }}
                tickFormatter={(value) => `${value}s`}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: 'hsl(var(--primary))', fontSize: 10 }}
                tickFormatter={(value) => `${value}km`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fill: 'hsl(var(--primary))', fontSize: 10 }}
                tickFormatter={(value) => `${value}m/s`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--primary))',
                  color: 'hsl(var(--primary))'
                }}
                formatter={(value: number, name: string) => [
                  `${value.toFixed(2)} ${name === 'altitude' ? 'km' : 'm/s'}`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Line yAxisId="left" type="monotone" dataKey="altitude" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="velocity" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

