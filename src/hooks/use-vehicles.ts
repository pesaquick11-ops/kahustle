"use client"
import { VehicleListing } from "@/lib/vehicles/types"
import { useEffect, useState } from "react"

type Pagination = { page: number; limit: number; total: number; pages: number }

export function useVehicles(queryString: string) {
  const [data, setData] = useState<VehicleListing[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch(`/api/vehicles?${queryString}`)
      .then((res) => res.json())
      .then((json) => {
        if (!active) return
        setData(json.data || [])
        setPagination(json.pagination || null)
        setLoading(false)
      })
    return () => { active = false }
  }, [queryString])

  return { data, pagination, loading }
}
