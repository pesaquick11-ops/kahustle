import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getProperty } from "@/lib/properties/get-property"
import { normalizePropertyDetail } from "@/lib/properties/normalize-property"
import { canViewPropertySellerContact } from "@/lib/properties/property-permissions"
export default async function PropertyListingPage({params}:{params:Promise<{id:string}>}){const [{id},session]=await Promise.all([params,getServerSession(authOptions)]);const raw=await getProperty(id);if(!raw)notFound();const user=session?.user?{_id:session.user.id??undefined,roles:session.user.roles}:null;const canView=canViewPropertySellerContact(user);const property=normalizePropertyDetail(raw as never,canView);return <main className="mx-auto max-w-5xl p-6"><h1 className="text-2xl font-bold">{property.name}</h1><p>{property.city}</p><p>KES {property.price}</p><p>{property.description}</p><p>{canView?property.seller?.phone:"Login as PROPERTY_BUYER to view seller contacts"}</p></main>}
