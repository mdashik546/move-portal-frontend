import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const movieService = {
  createMovie: async (formData: FormData) => {
    return await fetchWithAuth("/movies", {
      method: "POST",
      body: formData,
    });
  },

  getAllMovies: async () => {
    return await fetchWithAuth("/movies");
  },

  getMovieById: async (id: string) => {
    return await fetchWithAuth(`/movies/${id}`);
  },

  createPaymentSession: async (movieId: string) => {
    return await fetchWithAuth(`/movies/subscription/${movieId}`, {
      method: "POST",
    });
  },

  getMyMovies: async () => {
    return await fetchWithAuth("/movies/my-movies");
  },
};
