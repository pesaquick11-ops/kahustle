import { VehicleListing } from "@/lib/vehicles/types"
import { formatMileage } from "@/lib/vehicles/vehicle-formatters"

export default function VehicleSpecs({ vehicle }: { vehicle: VehicleListing }) {
  const specs = [["Mileage", formatMileage(vehicle.mileage)], ["Fuel", vehicle.fuelType], ["Transmission", vehicle.transmission], ["Body", vehicle.bodyType], ["Color", vehicle.color], ["VIN", vehicle.vin || "N/A"]]
  return <div className="rounded border p-4">{specs.map(([k, v]) => <div key={k} className="flex justify-between border-b py-2 last:border-b-0"><span>{k}</span><span className="font-medium">{v}</span></div>)}</div>
}
