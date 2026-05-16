"use client"
import { useMemo, useState } from "react"
import { useConstructionServices } from "@/hooks/construction-services/use-construction-services"
export default function ConstructionFreelancersPage(){const [params,setParams]=useState(new URLSearchParams({page:"1",limit:"20",sort:"newest"}));const query=useMemo(()=>params.toString(),[params]);const {services,loading}=useConstructionServices(query);return <main className="mx-auto max-w-6xl p-6"><h1 className="text-3xl font-bold mb-4">Construction Freelancers</h1>{loading?"Loading...":<div className="grid grid-cols-1 md:grid-cols-3 gap-3">{services.map(s=><a key={s.id} href={s.detailUrl} className="border p-3 rounded"><h3>{s.name}</h3><p>{s.category}</p></a>)}</div>}</main>}
