'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Step {
  id: number
  title: string
  status: 'completed' | 'in-progress' | 'pending'
}

const missionSteps: Step[] = [
  { id: 1, title: 'Pre-Launch Checks', status: 'pending' },
  { id: 2, title: 'Engine Ignition', status: 'pending' },
  { id: 3, title: 'Liftoff', status: 'pending' },
  { id: 4, title: 'Max-Q', status: 'pending' },
  { id: 5, title: 'MECO', status: 'pending' },
  { id: 6, title: 'Stage Separation', status: 'pending' },
  { id: 7, title: 'Orbit Insertion', status: 'pending' },
  { id: 8, title: 'Landing', status: 'pending' }
]

export default function MissionProgress() {
  const [currentStep, setCurrentStep] = useState(1)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => prev < missionSteps.length ? prev + 1 : prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-primary/60">Mission Progress</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-[2px] bg-primary/20" />
          <div 
            className="absolute top-5 left-0 h-[2px] bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (missionSteps.length - 1)) * 100}%` }}
          />
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {missionSteps.map((step, index) => {
              const status = 
                index + 1 < currentStep ? 'completed' :
                index + 1 === currentStep ? 'in-progress' : 'pending'
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200",
                    status === 'completed' ? "border-primary bg-primary text-primary-foreground" :
                    status === 'in-progress' ? "border-primary bg-background text-primary" :
                    "border-primary/20 bg-background text-primary/20"
                  )}>
                    {status === 'completed' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm">{step.id}</span>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium transition-colors duration-200",
                    status === 'completed' ? "text-primary" :
                    status === 'in-progress' ? "text-primary" :
                    "text-primary/40"
                  )}>
                    {step.title}
                  </span>
                  <span className={cn(
                    "text-xs mt-1",
                    status === 'completed' ? "text-primary" :
                    status === 'in-progress' ? "text-primary/60" :
                    "text-primary/40"
                  )}>
                    {status === 'completed' ? 'Completed' :
                     status === 'in-progress' ? 'In Progress' :
                     'Pending'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

