import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TelemetryCardProps {
  title: string
  value: number
  unit: string
}

const TelemetryCard: FC<TelemetryCardProps> = ({ title, value, unit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {value.toFixed(2)} {unit}
        </p>
      </CardContent>
    </Card>
  )
}

export default TelemetryCard

