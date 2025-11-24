// app/lib/roles.ts
import rolesRaw from "../data/roles.json";
import type { RoleGuide, RoleId } from "@/app/types/roles";

// Extract the actual array and build a lookup map keyed by slug for fast access.
const roles = rolesRaw as Record<RoleId, RoleGuide>;


export function getAllRoles(): RoleGuide[] {
  return Object.values(roles);
}

export function getRoleBySlug(slug: string): RoleGuide | null {
    if(!slug) return null;
  const key = slug.toLowerCase() as RoleId;
  return roles[key] ?? null;
}