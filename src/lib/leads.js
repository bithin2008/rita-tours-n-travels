import { base44 } from "@/api/base44Client";

/** Creates a lead record for newsletter signups and tour enquiries. */
export function createLead(payload) {
  return base44.entities.Lead.create(payload);
}

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());