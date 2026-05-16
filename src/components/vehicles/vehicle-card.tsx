import { VehicleListing } from "@/lib/vehicles/types"
import Link from "next/link"
import { formatCurrency, formatMileage, formatPostedDate } from "@/lib/vehicles/vehicle-formatters"

export default function VehicleCard({ vehicle }: { vehicle: VehicleListing }) {
  return (
    <Link href={vehicle.detailUrl} className="block rounded border p-3 hover:shadow">
      {vehicle.image ? <img src={vehicle.image} alt={vehicle.name} className="h-44 w-full rounded object-cover" /> : <div className="h-44 w-full rounded bg-gray-100" />}
      <h3 className="mt-2 font-semibold">{vehicle.name}</h3>
      <p className="text-sm text-gray-600">{vehicle.condition} • {vehicle.fuelType} • {vehicle.transmission}</p>
      <p className="text-sm text-gray-600">{formatMileage(vehicle.mileage)} • {vehicle.location}</p>
      <p className="mt-1 text-lg font-bold">{formatCurrency(vehicle.price, vehicle.currency)}</p>
      <p className="text-xs text-gray-500">Posted {formatPostedDate(vehicle.createdAt)}</p>
    </Link>
  )
}
