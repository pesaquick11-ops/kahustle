import SpecializedProductDetailPage from "@/components/specialized-product-detail-page"
import { Property } from "@/models/Property"

export default async function PropertyListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SpecializedProductDetailPage id={id} config={{
    category: "properties", listingLabel: "Property", model: Property, callbackPrefix: "/properties/listing",
    details: (item) => [
      { label: "Type", value: item.propertyType || "N/A" },
      { label: "Bedrooms", value: String(item.bedrooms ?? "N/A") },
      { label: "Bathrooms", value: String(item.bathrooms ?? "N/A") },
      { label: "Square Feet", value: item.squareFeet ? item.squareFeet.toLocaleString() : "N/A" },
      { label: "City", value: item.city || "N/A" },
      { label: "Condition", value: item.condition || "N/A" },
    ],
  }} />
}
