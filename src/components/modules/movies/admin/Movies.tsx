"use client";
import { movieService } from "@/services/movie.service";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import { MovieCardProps } from "@/types/movie.types";
import LoadingState from "@/components/shared/Loading";
import { Film } from "lucide-react";

const AllMovies = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: movieService.getAllMovies,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // 2. Loading State
  if (isLoading && !movies) {
    return <LoadingState message="Loading movies..." />;
  }

  const movieList = movies?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center gap-3 mb-8">
        <Film className="text-red-500" />
        <h1 className="text-3xl font-extrabold tracking-tight">All Movies</h1>
      </header>

      {movieList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movieList.map((movie: MovieCardProps) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-lg">
            No movies found in our database.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMovies;
