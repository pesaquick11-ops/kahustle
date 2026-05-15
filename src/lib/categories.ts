import { Role, type UserRole } from "@/lib/roles"

export const CATEGORY_KEYS = ["vehicles", "properties", "careers", "construction-freelancers"] as const
export type CategoryKey = (typeof CATEGORY_KEYS)[number]

export type CategoryRegistryEntry = {
  key: CategoryKey
  displayName: string
  routeBase: `/${CategoryKey}`
  modelName: "Vehicle" | "Property" | "Job" | "ConstructionService"
  apiRoute: string
  detailRoute: string
  createRoute: string
  filterConfiguration: {
    supportsPrice: boolean
    supportsSearch: boolean
    supportsSort: boolean
  }
  allowedCreatorRoles: UserRole[]
  allowedViewerRolesForRestrictedActions: UserRole[]
}

export const CATEGORY_REGISTRY: Record<CategoryKey, CategoryRegistryEntry> = {
  vehicles: {
    key: "vehicles",
    displayName: "Vehicles",
    routeBase: "/vehicles",
    modelName: "Vehicle",
    apiRoute: "/api/vehicles",
    detailRoute: "/vehicles/listing",
    createRoute: "/account?tab=listings&create=vehicles",
    filterConfiguration: { supportsPrice: true, supportsSearch: true, supportsSort: true },
    allowedCreatorRoles: [Role.CARDEALER, Role.ADMIN, Role.STAFF],
    allowedViewerRolesForRestrictedActions: [Role.CARBUYER, Role.ADMIN, Role.STAFF],
  },
  properties: {
    key: "properties",
    displayName: "Properties",
    routeBase: "/properties",
    modelName: "Property",
    apiRoute: "/api/properties",
    detailRoute: "/properties/listing",
    createRoute: "/account?tab=listings&create=properties",
    filterConfiguration: { supportsPrice: true, supportsSearch: true, supportsSort: true },
    allowedCreatorRoles: [Role.PROPERTY_SELLER, Role.ADMIN, Role.STAFF],
    allowedViewerRolesForRestrictedActions: [Role.PROPERTY_BUYER, Role.ADMIN, Role.STAFF],
  },
  careers: {
    key: "careers",
    displayName: "Careers",
    routeBase: "/careers",
    modelName: "Job",
    apiRoute: "/api/jobs",
    detailRoute: "/careers/listing",
    createRoute: "/account?tab=listings&create=careers",
    filterConfiguration: { supportsPrice: false, supportsSearch: true, supportsSort: true },
    allowedCreatorRoles: [Role.RECRUITER, Role.ADMIN, Role.STAFF],
    allowedViewerRolesForRestrictedActions: [Role.JOBSEEKER, Role.ADMIN, Role.STAFF],
  },
  "construction-freelancers": {
    key: "construction-freelancers",
    displayName: "Construction Freelancers",
    routeBase: "/construction-freelancers",
    modelName: "ConstructionService",
    apiRoute: "/api/construction-freelancers",
    detailRoute: "/construction-freelancers/listing",
    createRoute: "/account?tab=listings&create=construction-freelancers",
    filterConfiguration: { supportsPrice: true, supportsSearch: true, supportsSort: true },
    allowedCreatorRoles: [Role.CONSTRUCTION_FREELANCER, Role.ADMIN, Role.STAFF],
    allowedViewerRolesForRestrictedActions: [Role.CONSTRUCTION_FREELANCER_SEEKER, Role.ADMIN, Role.STAFF],
  },
}

export function getCategoryEntry(key: CategoryKey): CategoryRegistryEntry {
  return CATEGORY_REGISTRY[key]
}
