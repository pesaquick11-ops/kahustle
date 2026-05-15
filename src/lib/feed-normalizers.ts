import type { CategoryKey } from "@/lib/categories"
import { getListingDetailRoute } from "@/lib/listing-routes"

export type NormalizedFeedListing = {
  id: string
  title: string
  description: string
  price?: number
  images: string[]
  categoryKey: CategoryKey
  subcategory?: string
  seller?: unknown
  createdAt: Date | string
  location?: string
  detailUrl: string
  listingType?: string
}

type FeedLike = {
  _id: string
  name: string
  description?: string
  price?: number
  images?: string[]
  subcategory?: string
  userId?: unknown
  createdAt: Date | string
  location?: string
  vehicleType?: string
  propertyType?: string
  industry?: string
  category?: string
}

function normalizeCommon(item: FeedLike, categoryKey: CategoryKey, listingType?: string): NormalizedFeedListing {
  return {
    id: String(item._id),
    title: item.name,
    description: item.description ?? "",
    price: item.price,
    images: item.images ?? [],
    categoryKey,
    subcategory: item.subcategory,
    seller: item.userId,
    createdAt: item.createdAt,
    location: item.location,
    detailUrl: getListingDetailRoute(categoryKey, String(item._id)),
    listingType,
  }
}

export const feedNormalizers = {
  vehicle: (item: FeedLike) => normalizeCommon(item, "vehicles", item.vehicleType),
  property: (item: FeedLike) => normalizeCommon(item, "properties", item.propertyType),
  career: (item: FeedLike) => normalizeCommon(item, "careers", item.industry),
  constructionFreelancer: (item: FeedLike) => normalizeCommon(item, "construction-freelancers", item.category),
}
