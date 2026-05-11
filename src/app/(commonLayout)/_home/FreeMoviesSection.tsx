"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Tv } from "lucide-react"; // Tv icon for a fresh look
import { useQuery } from "@tanstack/react-query";
import { movieService } from "@/services/movie.service";
import LoadingState from "@/components/shared/Loading";
import { MovieCardProps } from "@/types/movie.types";
import Image from "next/image";
import Link from "next/link";

export function FreeMoviesSection() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: movieService.getAllMovies,
    staleTime: 0,
  });

  if (isLoading) {
    return <LoadingState message="Loading free movies..." />;
  }

  const filterMovies =
    movies?.data?.filter((movie: MovieCardProps) => !movie.isPremium) || [];

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Simple Header - Consistent with Premium Section */}
        <div className="mb-8 flex items-end justify-between border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Tv className="h-5 w-5 text-green-500" />
              Free to Watch
            </h2>
            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-[0.2em]">
              Enjoy instant streaming at no cost
            </p>
          </div>
          <Link
            href="/movies"
            className="text-xs font-bold text-green-500 hover:text-green-400 transition-colors uppercase tracking-widest"
          >
            Explore Free
          </Link>
        </div>

        {filterMovies.length === 0 ? (
          <p className="text-zinc-500 text-sm italic">
            Stay tuned for free movies.
          </p>
        ) : (
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {filterMovies.map((movie: MovieCardProps) => (
                <CarouselItem
                  key={movie.id}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  {/* Link applied to the whole card for better UX */}
                  <Link href={`/movies/${movie.id}`}>
                    <div className="group relative aspect-2/3 overflow-hidden rounded-lg bg-zinc-900 border border-white/5 transition-all cursor-pointer">
                      {/* Poster Image */}
                      <Image
                        src={movie?.posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Clean Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />

                      {/* Hover Action Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="truncate text-[13px] font-bold text-white transition-colors group-hover:text-green-400 uppercase tracking-tight">
                          {movie.title}
                        </h3>
                        <p className="text-[9px] text-zinc-500 mt-0.5 uppercase">
                          {movie.releaseYear} • {movie.genre}
                        </p>
                      </div>

                      {/* Subtle FREE Badge */}
                      <div className="absolute top-2 left-2">
                        <div className="rounded bg-green-500/90 px-1.5 py-0.5 text-[8px] font-black text-white">
                          FREE
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows - Match Premium Style */}
            <CarouselPrevious className="hidden md:flex -left-4 border-none bg-zinc-900/80 text-white hover:bg-green-500 hover:text-white transition-all" />
            <CarouselNext className="hidden md:flex -right-4 border-none bg-zinc-900/80 text-white hover:bg-green-500 hover:text-white transition-all" />
          </Carousel>
        )}
      </div>
    </section>
  );
}
