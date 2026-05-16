import { VehicleDetail } from "@/lib/vehicles/types"
export default function VehicleSeller({ seller, canView }: { seller: VehicleDetail["seller"]; canView: boolean }) {
  if (!seller) return null
  return <div className="rounded border p-4"><h3 className="font-semibold">Seller</h3><p>{seller.name}</p>{canView ? <><p>{seller.email}</p><p>{seller.phone}</p></> : <div className="mt-2 rounded bg-amber-50 p-3 text-sm">Add CARBUYER role to contact this seller.</div>}</div>
}
