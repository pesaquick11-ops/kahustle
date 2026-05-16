import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Vehicle } from "@/models/Vehicle"
import { buildVehicleQuery, normalizeVehiclePagination, vehicleSortToMongo } from "@/lib/vehicles/vehicle-queries"
import { normalizeVehicleListing } from "@/lib/vehicles/normalize-vehicle"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const filter = buildVehicleQuery(searchParams)
    const { page, limit, skip } = normalizeVehiclePagination(searchParams)
    const sort = vehicleSortToMongo(searchParams.get("sort"))

    const [vehicles, total] = await Promise.all([
      Vehicle.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Vehicle.countDocuments(filter),
    ])

    return NextResponse.json({
      success: true,
      data: vehicles.map(normalizeVehicleListing),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("GET /api/vehicles error", error)
    return NextResponse.json({ success: false, error: "Failed to fetch vehicles" }, { status: 500 })
  }
}
