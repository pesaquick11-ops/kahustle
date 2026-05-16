import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getConstructionService } from "@/lib/construction-freelancers/get-construction-service"
import { normalizeConstructionDetail } from "@/lib/construction-freelancers/normalize-construction"
import { canViewConstructionFreelancerContact } from "@/lib/construction-freelancers/construction-permissions"
export default async function ConstructionListingPage({params}:{params:Promise<{id:string}>}){const [{id},session]=await Promise.all([params,getServerSession(authOptions)]);const raw=await getConstructionService(id);if(!raw)notFound();const user=session?.user?{_id:session.user.id??undefined,roles:session.user.roles}:null;const canView=canViewConstructionFreelancerContact(user);const service=normalizeConstructionDetail(raw as never,canView);return <main className="mx-auto max-w-5xl p-6"><h1 className="text-2xl font-bold">{service.name}</h1><p>{service.category}</p><p>KES {service.price}</p><p>{service.description}</p><p>{canView?service.freelancer?.phone:"Login as CONSTRUCTION_FREELANCER_SEEKER to view contacts"}</p></main>}
