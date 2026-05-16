"use client"
export default function VehicleFilters({ values, onChange }: { values: URLSearchParams; onChange: (k: string, v: string) => void }) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      <input placeholder="Search make/model" defaultValue={values.get("search") || ""} onBlur={(e) => onChange("search", e.target.value)} className="rounded border p-2" />
      <input placeholder="Make" defaultValue={values.get("make") || ""} onBlur={(e) => onChange("make", e.target.value)} className="rounded border p-2" />
      <select defaultValue={values.get("sort") || "newest"} onChange={(e) => onChange("sort", e.target.value)} className="rounded border p-2"><option value="newest">Newest</option><option value="lowest-price">Lowest price</option><option value="highest-price">Highest price</option><option value="lowest-mileage">Lowest mileage</option><option value="highest-mileage">Highest mileage</option><option value="newest-year">Newest year</option></select>
    </div>
  )
}
