const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const statsService = {
  getAllStats: async () => {
    const res = await fetch(`${API_BASE_URL}/stats`, {
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch stats");
    }
    return data;
  },
};
