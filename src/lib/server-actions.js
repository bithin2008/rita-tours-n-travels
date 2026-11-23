"use server";

import { getFaqs } from "@/lib/data-service";

export async function listFaqs() {
  return getFaqs();
}

export async function listJobOpenings() {
  return [];
}
