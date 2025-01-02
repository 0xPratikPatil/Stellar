'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface TelemetryCardProps {
  id: string
  title: string
  unit: string
  data: number[] | { x: number; y: number; z: number }[]
  size?: 'regular' | 'large'
}

function TelemetryCard({ id, title, unit, data, size = 'regular' }: TelemetryCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isMultiAxis = Array.isArray(data) && typeof data[0] === 'object'

  const chartData = isMultiAxis
    ? (data as { x: number; y: number; z: number }[]).map((value, index) => ({
        name: index,
        x: value.x,
        y: value.y,
        z: value.z,
      }))
    : (data as number[]).map((value, index) => ({
        name: index,
        value,
      }))

  const currentValue = isMultiAxis
    ? (data as { x: number; y: number; z: number }[])[data.length - 1] || { x: 0, y: 0, z: 0 }
    : (data as number[])[data.length - 1] || 0

  const minValue = isMultiAxis
    ? Math.min(...(data as { x: number; y: number; z: number }[]).flatMap(v => [v.x, v.y, v.z]))
    : Math.min(...(data as number[]))
  const maxValue = isMultiAxis
    ? Math.max(...(data as { x: number; y: number; z: number }[]).flatMap(v => [v.x, v.y, v.z]))
    : Math.max(...(data as number[]))

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`bg-background border-primary/20 cursor-move ${size === 'large' ? 'col-span-2' : ''}`}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-sm font-normal text-primary/60">{title}</CardTitle>
        <div className="text-sm font-bold tabular-nums text-primary border border-primary/40 px-2 py-1 rounded">
          {isMultiAxis && typeof currentValue === 'object'
            ? `X: ${currentValue.x.toFixed(2)}, Y: ${currentValue.y.toFixed(2)}, Z: ${currentValue.z.toFixed(2)}`
            : `${(currentValue as number).toFixed(2)}`} {unit}
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className={size === 'large' ? 'h-64' : 'h-28'}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--primary), 0.6)', fontSize: 8 }}
                tickFormatter={(value) => `${value}s`}
                axisLine={{ stroke: 'hsl(var(--primary), 0.2)' }}
              />
              <YAxis 
                domain={[minValue, maxValue]}
                tick={{ fill: 'hsl(var(--primary), 0.6)', fontSize: 8 }}
                tickFormatter={(value) => value.toFixed(1)}
                axisLine={{ stroke: 'hsl(var(--primary), 0.2)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'black',
                  border: '1px solid hsl(var(--primary), 0.2)',
                  color: 'hsl(var(--primary))',
                  fontSize: '10px'
                }}
                formatter={(value: number, name: string) => [`${value.toFixed(2)} ${unit}`, name]}
                labelFormatter={(label) => `Time: ${label}s`}
              />
              {isMultiAxis ? (
                <>
                  <Line type="monotone" dataKey="x" stroke="hsl(var(--primary))" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="y" stroke="hsl(var(--destructive))" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="z" stroke="hsl(var(--secondary))" strokeWidth={1.5} dot={false} />
                </>
              ) : (
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={1.5} dot={false} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface TelemetryGridProps {
  parameters: Array<{ id: string; title: string; unit: string; size?: 'regular' | 'large' }>
  telemetryData: Record<string, number[] | { x: number; y: number; z: number }[]>
}

export default function TelemetryGrid({ parameters, telemetryData }: TelemetryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {parameters.map((param) => (
        <TelemetryCard
          key={param.id}
          id={param.id}
          title={param.title}
          unit={param.unit}
          data={telemetryData[param.id] || []}
          size={param.size}
        />
      ))}
    </div>
  )
}

