import SpecializedProductDetailPage from "@/components/specialized-product-detail-page"
import { Job } from "@/models/Job"

export default async function CareerListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SpecializedProductDetailPage id={id} config={{
    category: "careers", listingLabel: "Career", model: Job, callbackPrefix: "/careers/listing",
    details: (item) => [
      { label: "Company", value: item.company || "N/A" },
      { label: "Job Title", value: item.jobTitle || "N/A" },
      { label: "Employment", value: item.employmentType || "N/A" },
      { label: "Location", value: item.location || "N/A" },
      { label: "Remote", value: item.remote ? "Yes" : "No" },
      { label: "Salary", value: `${item.currency || "KES"} ${item.salaryMin?.toLocaleString?.() || 0} - ${item.salaryMax?.toLocaleString?.() || 0}` },
    ],
  }} />
}
