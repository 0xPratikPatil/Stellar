export function generateTelemetryData(parameter: string): number {
  const baseValue = Math.random() * 100
  
  switch (parameter) {
    case 'altitude':
      return baseValue * 10 // 0-1000 km
    case 'velocity':
      return baseValue * 100 // 0-10000 m/s
    case 'temperature':
      return baseValue - 50 // -50 to 50 °C
    case 'pressure':
      return baseValue * 10 // 0-1000 kPa
    case 'gyroscope':
      return (baseValue - 50) * 2 // -100 to 100 °/s
    case 'accelerometer':
      return baseValue / 10 - 5 // -5 to 5 m/s²
    default:
      return baseValue
  }
}

