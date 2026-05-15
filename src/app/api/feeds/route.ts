import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Vehicle } from "@/models/Vehicle"
import { Property } from "@/models/Property"
import { Job } from "@/models/Job"
import { ConstructionService } from "@/models/ConstructionService"
import { feedNormalizers } from "@/lib/feed-normalizers"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10))
    const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get("limit") || "20", 10)))

    const [vehicles, properties, jobs, constructionServices] = await Promise.all([
      Vehicle.find({ status: "active" }).lean(),
      Property.find({ status: "active" }).lean(),
      Job.find({ status: "active" }).lean(),
      ConstructionService.find({ status: "active" }).lean(),
    ])

    const allItems = [
      ...vehicles.map(feedNormalizers.vehicle),
      ...properties.map(feedNormalizers.property),
      ...jobs.map(feedNormalizers.career),
      ...constructionServices.map(feedNormalizers.constructionFreelancer),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const totalCount = allItems.length
    const skip = (page - 1) * limit
    const paginatedItems = allItems.slice(skip, skip + limit)
    const totalPages = Math.max(1, Math.ceil(totalCount / limit))

    return NextResponse.json({
      products: paginatedItems,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("GET /api/feeds error:", error)
    return NextResponse.json({ error: "Failed to fetch feeds" }, { status: 500 })
  }
}
