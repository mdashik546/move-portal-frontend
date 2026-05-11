import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function getAllStats() {
  const data = await fetchWithAuth("/stats");

  return data;
}
