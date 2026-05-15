export enum Role {
  JOBSEEKER = "JOBSEEKER",
  RECRUITER = "RECRUITER",
  CARDEALER = "CARDEALER",
  CARBUYER = "CARBUYER",
  CONSTRUCTION_FREELANCER = "CONSTRUCTION_FREELANCER",
  CONSTRUCTION_FREELANCER_SEEKER = "CONSTRUCTION_FREELANCER_SEEKER",
  PROPERTY_BUYER = "PROPERTY_BUYER",
  PROPERTY_SELLER = "PROPERTY_SELLER",
  USER = "USER",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}

export type UserRole = Role

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [Role.JOBSEEKER]: "Allows you to open full job details and apply for jobs.",
  [Role.RECRUITER]: "Allows you to post and manage job advertisements.",
  [Role.CARDEALER]: "Allows you to create and manage vehicle listings.",
  [Role.CARBUYER]: "Allows you to access saved vehicles and buyer tools.",
  [Role.CONSTRUCTION_FREELANCER]: "Allows you to create and manage construction freelancer listings.",
  [Role.CONSTRUCTION_FREELANCER_SEEKER]: "Allows you to contact and hire construction freelancers.",
  [Role.PROPERTY_BUYER]: "Allows you to access buyer workflows for property listings.",
  [Role.PROPERTY_SELLER]: "Allows you to create and manage property listings.",
  [Role.USER]: "Base authenticated marketplace access.",
  [Role.ADMIN]: "Administrative access to all marketplace controls.",
  [Role.STAFF]: "Operational access to staff marketplace controls.",
}

export function hasAnyRole(userRoles: UserRole[] | undefined, requiredRoles: UserRole[]): boolean {
  if (!requiredRoles.length) return true
  if (!userRoles?.length) return false
  return requiredRoles.some((role) => userRoles.includes(role))
}
