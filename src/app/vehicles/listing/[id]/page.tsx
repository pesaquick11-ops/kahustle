import { VehicleDetail as VehicleDetailType } from "@/lib/vehicles/types"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import VehicleDetail from "@/components/vehicles/vehicle-detail"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { canViewVehicleSellerContact } from "@/lib/vehicles/vehicle-permissions"

async function getVehicle(id: string): Promise<VehicleDetailType | null> {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000"
  const res = await fetch(`${base}/api/vehicles/${id}`, { cache: "no-store" })
  if (res.status === 404) return null
  const json = await res.json()
  return json.data
}

export default async function VehicleListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = await getVehicle(id)
  if (!vehicle) notFound()

  await connectToDatabase()
  const session = await getServerSession()
  const user = session?.user?.email ? await User.findOne({ email: session.user.email }).lean() : null
  const canView = canViewVehicleSellerContact(user as { roles?: string[] } | null)

  return <main className="mx-auto max-w-6xl p-4"><VehicleDetail vehicle={vehicle} canViewSellerContact={canView} /></main>
}
