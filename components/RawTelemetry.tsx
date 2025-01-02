export function RawTelemetry() {
  return (
    <div className="border border-emerald-400 bg-black p-3 rounded-sm">
      <div className="text-xs mb-2">RAW TELEMETRY</div>
      <div className="h-48 overflow-auto text-xs font-mono">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="opacity-50">
            {`$F0,000000$0,00000$0$0$<`}
            {Math.random().toString(16).substring(2, 10)}
            {`>$`}
          </div>
        ))}
      </div>
    </div>
  )
}

