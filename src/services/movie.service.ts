const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const movieService = {
  createMovie: async (formData: FormData) => {
    const res = await fetch(`${API_BASE_URL}/movies`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  },

  getAllMovies: async () => {
    const res = await fetch(`${API_BASE_URL}/movies`, {
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  },

  getMovieById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  },

  createPaymentSession: async (movieId: string) => {
    const res = await fetch(`${API_BASE_URL}/movies/subscription/${movieId}`, {
      method: "POST",
      credentials: "include",
    });

    let data;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(data?.message || "Payment session failed");
    }

    return data;
  },

  getMyMovies: async () => {
    const res = await fetch(`${API_BASE_URL}/movies/my-movies`, {
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }
    return data;
  },
};
