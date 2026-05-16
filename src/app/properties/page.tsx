"use client"
import { useMemo, useState } from "react"
import { useProperties } from "@/hooks/properties/use-properties"
export default function PropertiesPage(){const [params,setParams]=useState(new URLSearchParams({page:"1",limit:"20",sort:"newest"}));const query=useMemo(()=>params.toString(),[params]);const {properties,loading}=useProperties(query);return <main className="mx-auto max-w-6xl p-6"><h1 className="text-3xl font-bold mb-4">Properties</h1>{loading?"Loading...":<div className="grid grid-cols-1 md:grid-cols-3 gap-3">{properties.map(p=><a key={p.id} href={p.detailUrl} className="border p-3 rounded"><h3>{p.name}</h3><p>{p.city}</p></a>)}</div>}</main>}
