import { CATEGORY_REGISTRY, type CategoryKey } from "@/lib/categories"

export function getListingDetailRoute(categoryKey: CategoryKey, listingId: string): string {
  return `${CATEGORY_REGISTRY[categoryKey].detailRoute}/${listingId}`
}

export function getCategoryRoute(categoryKey: CategoryKey): string {
  return CATEGORY_REGISTRY[categoryKey].routeBase
}
