'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Task {
  name: string
  progress: number
}

const initialTasks: Task[] = [
  { name: 'System Check', progress: 0 },
  { name: 'Fuel Loading', progress: 0 },
  { name: 'Navigation Setup', progress: 0 },
  { name: 'Communication Test', progress: 0 },
]

export default function CommandControl() {
  const [tasks, setTasks] = useState(initialTasks)

  const handleTaskProgress = (index: number) => {
    setTasks(prevTasks => 
      prevTasks.map((task, i) => 
        i === index ? { ...task, progress: Math.min(task.progress + 20, 100) } : task
      )
    )
  }

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-primary/60">Command Control</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.map((task, index) => (
          <div key={task.name} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-primary">{task.name}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleTaskProgress(index)}
                className="text-xs border-primary/20 hover:bg-primary/10"
              >
                Execute
              </Button>
            </div>
            <Progress value={task.progress} className="h-2 bg-primary/20"/>
            <span className="text-xs text-primary/60">{task.progress}%</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

