'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function ConnectionPort() {
  return (
    <div className="flex items-center gap-4">
      <div className="text-xs uppercase">Connection Port</div>
      <Select defaultValue="COM3">
        <SelectTrigger className="w-[200px] bg-gray-900 border-emerald-400">
          <SelectValue placeholder="Select port" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="COM1">COM1: USB SERIAL CH340</SelectItem>
          <SelectItem value="COM2">COM2: USB SERIAL CH340</SelectItem>
          <SelectItem value="COM3">COM3: USB SERIAL CH340</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="bg-gray-200 text-black hover:bg-gray-300">
        START
      </Button>
      <Button variant="outline" className="bg-orange-500 text-black hover:bg-orange-600">
        STOP
      </Button>
    </div>
  )
}

