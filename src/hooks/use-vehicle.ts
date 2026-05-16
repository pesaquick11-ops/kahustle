"use client"
import { VehicleDetail } from "@/lib/vehicles/types"
import { useEffect, useState } from "react"

export function useVehicle(id: string) {
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch(`/api/vehicles/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (!active) return
        setVehicle(json.data || null)
        setLoading(false)
      })
    return () => { active = false }
  }, [id])

  return { vehicle, loading }
}
