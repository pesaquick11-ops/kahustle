import SpecializedProductDetailPage from "@/components/specialized-product-detail-page"
import { ConstructionService } from "@/models/ConstructionService"

export default async function ConstructionListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SpecializedProductDetailPage id={id} config={{
    category: "construction-freelancers", listingLabel: "Construction Freelancer", model: ConstructionService, callbackPrefix: "/construction-freelancers/listing",
    details: (item) => [
      { label: "Specialty", value: item.category || "N/A" },
      { label: "Experience", value: `${item.yearsOfExperience ?? 0} years` },
      { label: "Price Type", value: item.priceType || "N/A" },
      { label: "Availability", value: item.availability || "N/A" },
      { label: "Insured", value: item.insurance ? "Yes" : "No" },
      { label: "Service Areas", value: item.serviceArea?.join(", ") || "N/A" },
    ],
  }} />
}
