import { NextRequest, NextResponse } from "next/server"
import { Types } from "mongoose"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/db"
import { Vehicle } from "@/models/Vehicle"
import { User } from "@/models/User"
import { canViewVehicleSellerContact } from "@/lib/vehicles/vehicle-permissions"
import { normalizeVehicleDetail } from "@/lib/vehicles/normalize-vehicle"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    const { id } = await params
    if (!Types.ObjectId.isValid(id)) return NextResponse.json({ success: false, error: "Invalid vehicle ID" }, { status: 400 })

    const session = await getServerSession()
    const currentUser = session?.user?.email ? await User.findOne({ email: session.user.email }).lean() : null

    const vehicle = await Vehicle.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate("userId", "name email phone location roles")
      .lean()

    if (!vehicle) return NextResponse.json({ success: false, error: "Vehicle not found" }, { status: 404 })

    const related = await Vehicle.find({ _id: { $ne: vehicle._id }, make: vehicle.make, status: "active" })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()

    return NextResponse.json({
      success: true,
      data: normalizeVehicleDetail(vehicle, canViewVehicleSellerContact(currentUser as { roles?: string[] } | null), related),
    })
  } catch (error) {
    console.error("GET /api/vehicles/[id] error", error)
    return NextResponse.json({ success: false, error: "Failed to fetch vehicle detail" }, { status: 500 })
  }
}
