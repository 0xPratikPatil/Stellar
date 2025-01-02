import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function StatusBar() {
  const systems = [
    { name: 'Telemetry', status: 'active' },
    { name: 'Navigation', status: 'active' },
    { name: 'Propulsion', status: 'active' },
    { name: 'Life Support', status: 'warning' },
    { name: 'Communications', status: 'active' },
  ]

  return (
    <div className="border-t border-emerald-400/20 py-4 bg-black">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {systems.map((system) => (
            <div key={system.name} className="flex items-center gap-2">
              <div 
                className={`size-2 rounded-full ${
                  system.status === 'active' 
                    ? 'bg-emerald-400 animate-pulse' 
                    : 'bg-yellow-500'
                }`} 
              />
              <span className="text-xs">{system.name}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Select defaultValue="COM1">
            <SelectTrigger className="w-[180px] border-emerald-400/20 bg-black">
              <SelectValue placeholder="Select port" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COM1">COM1: USB SERIAL</SelectItem>
              <SelectItem value="COM2">COM2: USB SERIAL</SelectItem>
              <SelectItem value="COM3">COM3: USB SERIAL</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" className="border-emerald-400/20 hover:bg-emerald-400/10">
              START
            </Button>
            <Button variant="outline" className="border-emerald-400/20 hover:bg-red-500/10 text-red-500">
              STOP
            </Button>
          </div>

          <div className="flex items-center gap-1 ml-4">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-4 ${
                  i < 25 ? 'bg-emerald-400' : 'bg-red-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

