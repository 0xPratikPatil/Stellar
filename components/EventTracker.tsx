'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Event {
  timestamp: number
  description: string
  executionTime: number
  totalTime: number
}

const events = [
  { name: "System Initialization", baseTime: 5 },
  { name: "Pre-launch Checks", baseTime: 10 },
  { name: "Engine Startup Sequence", baseTime: 15 },
  { name: "Launch Pad Disconnect", baseTime: 3 },
  { name: "Main Engine Ignition", baseTime: 8 },
  { name: "Liftoff", baseTime: 2 },
  { name: "Max-Q", baseTime: 12 },
  { name: "Stage Separation", baseTime: 6 },
  { name: "Second Stage Ignition", baseTime: 8 },
  { name: "Fairing Deployment", baseTime: 4 }
]

export default function EventTracker() {
  const [eventLog, setEventLog] = useState<Event[]>([])
  const [totalMissionTime, setTotalMissionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)]
      const executionTime = randomEvent.baseTime + Math.floor(Math.random() * 5)
      
      const newEvent: Event = {
        timestamp: Date.now(),
        description: randomEvent.name,
        executionTime,
        totalTime: totalMissionTime + executionTime
      }

      setEventLog(prevEvents => [...prevEvents, newEvent].slice(-10))
      setTotalMissionTime(prev => prev + executionTime)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalMissionTime])

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-primary/60">
          Event Tracker (Total Mission Time: {totalMissionTime}s)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {eventLog.map((event, index) => (
            <div key={index} className="mb-3 border-b border-primary/10 pb-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-primary/60">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-xs text-primary/60">
                  T+{event.totalTime}s
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-primary">{event.description}</p>
                <span className="text-xs text-primary/80 bg-primary/10 px-2 py-1 rounded">
                  {event.executionTime}s
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

