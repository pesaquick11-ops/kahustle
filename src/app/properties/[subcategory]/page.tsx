"use client"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import { useProperties } from "@/hooks/properties/use-properties"
export default function PropertySubcategoryPage(){const {subcategory}=useParams<{subcategory:string}>();const [params]=useState(new URLSearchParams({page:"1",limit:"20",sort:"newest",subcategory}));const {properties,loading}=useProperties(useMemo(()=>params.toString(),[params]));return <main className="mx-auto max-w-6xl p-6"><h1 className="text-2xl font-bold">{subcategory}</h1>{loading?"Loading...":properties.map(p=><a key={p.id} href={p.detailUrl}>{p.name}</a>)}</main>}
