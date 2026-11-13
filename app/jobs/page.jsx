import { listJobOpenings } from "@/lib/server-actions";
import JobsClient from "./_jobs-client";

export default async function JobsPage() {
  const openings = await listJobOpenings();
  return <JobsClient openings={openings} />;
}
