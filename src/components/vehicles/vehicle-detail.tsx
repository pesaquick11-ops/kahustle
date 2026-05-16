import { VehicleDetail } from "@/lib/vehicles/types"
import VehiclesGrid from "./vehicles-grid"
import VehicleGallery from "./vehicle-gallery"
import VehicleMeta from "./vehicle-meta"
import VehiclePrice from "./vehicle-price"
import VehicleSeller from "./vehicle-seller"
import VehicleSpecs from "./vehicle-specs"

export default function VehicleDetail({ vehicle, canViewSellerContact }: { vehicle: VehicleDetail; canViewSellerContact: boolean }) {
  return <div className="space-y-6"><VehicleGallery images={vehicle.images || []} /><div><h1 className="text-2xl font-bold">{vehicle.name}</h1><VehicleMeta vehicle={vehicle} /></div><VehiclePrice price={vehicle.price} currency={vehicle.currency} /><VehicleSpecs vehicle={vehicle} /><p>{vehicle.description}</p><VehicleSeller seller={vehicle.seller} canView={canViewSellerContact} />{vehicle.relatedVehicles?.length ? <div><h2 className="mb-2 text-xl font-semibold">Related vehicles</h2><VehiclesGrid vehicles={vehicle.relatedVehicles} /></div> : null}</div>
}
