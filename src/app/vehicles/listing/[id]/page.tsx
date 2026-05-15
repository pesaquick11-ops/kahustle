import SpecializedProductDetailPage from "@/components/specialized-product-detail-page"
import { Vehicle } from "@/models/Vehicle"

export default async function VehicleListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SpecializedProductDetailPage id={id} config={{
    category: "vehicles",
    listingLabel: "Vehicle",
    model: Vehicle,
    callbackPrefix: "/vehicles/listing",
    details: (item) => [
      { label: "Make", value: item.make || "N/A" },
      { label: "Model", value: item.vehicleModel || "N/A" },
      { label: "Year", value: String(item.year || "N/A") },
      { label: "Mileage", value: item.mileage ? `${item.mileage.toLocaleString()} km` : "N/A" },
      { label: "Fuel", value: item.fuelType || "N/A" },
      { label: "Transmission", value: item.transmission || "N/A" },
    ],
  }} />
}
