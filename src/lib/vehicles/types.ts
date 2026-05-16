export type VehicleListing = {
  id: string
  name: string
  make?: string
  vehicleModel?: string
  year?: number
  mileage?: number
  fuelType?: string
  transmission?: string
  bodyType?: string
  color?: string
  condition?: string
  price?: number
  currency: string
  image: string | null
  location: string
  createdAt?: Date | string
  detailUrl: string
  status?: string
}

export type VehicleDetail = VehicleListing & {
  description: string
  views: number
  vin: string | null
  images: string[]
  seller: { id: string; name?: string; location?: string; email?: string; phone?: string } | null
  relatedVehicles: VehicleListing[]
}
