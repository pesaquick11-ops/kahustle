"use client"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import { useConstructionServices } from "@/hooks/construction-services/use-construction-services"
export default function ConstructionSubcategoryPage(){const {subcategory}=useParams<{subcategory:string}>();const [params]=useState(new URLSearchParams({page:"1",limit:"20",sort:"newest",subcategory}));const {services,loading}=useConstructionServices(useMemo(()=>params.toString(),[params]));return <main className="mx-auto max-w-6xl p-6"><h1 className="text-2xl font-bold">{subcategory}</h1>{loading?"Loading...":services.map(s=><a key={s.id} href={s.detailUrl}>{s.name}</a>)}</main>}
