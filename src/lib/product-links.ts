const CATEGORY_ROUTE_PREFIX: Record<string, string> = {
  vehicles: "/vehicles/listing",
  properties: "/properties/listing",
  careers: "/careers/listing",
  "construction-freelancers": "/construction-freelancers/listing",
}

export function getProductDetailLink(category: string | undefined, id: string): string {
  const normalizedCategory = category?.trim().toLowerCase()
  if (!normalizedCategory) {
    return "#"
  }

  const categoryPath = CATEGORY_ROUTE_PREFIX[normalizedCategory]
  if (!categoryPath) {
    return "#"
  }

  return `${categoryPath}/${id}`
}
