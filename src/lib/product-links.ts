import { CATEGORY_REGISTRY, type CategoryKey } from "@/lib/categories"
import { getListingDetailRoute } from "@/lib/listing-routes"

export function getProductDetailLink(category: string | undefined, id: string): string {
  if (!category) return "#"
  const normalizedCategory = category.trim().toLowerCase() as CategoryKey
  if (!(normalizedCategory in CATEGORY_REGISTRY)) return "#"
  return getListingDetailRoute(normalizedCategory, id)
}
