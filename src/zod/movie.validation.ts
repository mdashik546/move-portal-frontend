import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  genre: z.string().min(1, "Genre is required"),
  releaseYear: z.coerce.number().min(1900).max(2100),
  price: z.coerce.number().min(0),
  director: z.string().min(1, "Director is required"),
  cast: z.array(z.string()).min(1, "Cast is required"),
  posterUrl: z.string("Invalid poster URL"),
  videoUrl: z.string("Invalid video URL"),
  isPremium: z.boolean(),
});

export type IMoviePayload = z.infer<typeof movieSchema>;
