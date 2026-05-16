"use client"
import { useMemo, useState } from "react"
import VehicleFilters from "@/components/vehicles/vehicle-filters"
import VehiclesGrid from "@/components/vehicles/vehicles-grid"
import { useVehicles } from "@/hooks/use-vehicles"

export default function VehiclesPage() {
  const [params, setParams] = useState(new URLSearchParams({ page: "1", limit: "20", sort: "newest" }))
  const query = useMemo(() => params.toString(), [params])
  const { data, pagination, loading } = useVehicles(query)

  const onChange = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value) next.delete(key)
    else next.set(key, value)
    if (key !== "page") next.set("page", "1")
    setParams(next)
  }

  return (
    <main className="mx-auto max-w-7xl p-4">
      <h1 className="mb-3 text-3xl font-bold">Vehicles Marketplace</h1>
      <VehicleFilters values={params} onChange={onChange} />
      {loading ? <p>Loading vehicles...</p> : data.length === 0 ? <p>No vehicles found.</p> : <VehiclesGrid vehicles={data} />}
      {pagination ? <div className="mt-5 flex items-center justify-between"><button disabled={pagination.page <= 1} onClick={() => onChange("page", String(pagination.page - 1))}>Previous</button><p>Page {pagination.page} of {pagination.pages}</p><button disabled={pagination.page >= pagination.pages} onClick={() => onChange("page", String(pagination.page + 1))}>Next</button></div> : null}
    </main>
  )
}
