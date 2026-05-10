"use client";
import LoadingState from "@/components/shared/Loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { movieService } from "@/services/movie.service";
import { MovieCardProps } from "@/types/movie.types";
import { useQuery } from "@tanstack/react-query";
import { Crown, Lock, Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PremiumMovieCard = () => {
  const router = useRouter();
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: movieService.getAllMovies,
  });

  if (isLoading) {
    return <LoadingState message="Polishing premium titles..." />;
  }

  const movieList: MovieCardProps[] = movies?.data ?? [];

  const premiumMovies = movieList.filter((movie) => movie.isPremium);

  if (!premiumMovies.length) {
    return <p className="text-center">No premium movies found</p>;
  }
  return (
    <section className="px-4 py-40 sm:px-6 lg:px-8 bg-black">
      <div className="mx-auto max-w-7xl">
        {/* Simple Header */}
        <div className="mb-8 flex items-end justify-between border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Premium Movies
            </h2>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">
              Experience the best of cinema
            </p>
          </div>
          <button
            onClick={() => router.push("/movies")}
            className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            View All
          </button>
        </div>

        {premiumMovies.length === 0 ? (
          <p className="text-zinc-500 text-sm">Coming soon...</p>
        ) : (
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {premiumMovies.map((movie) => {
                const isLocked = movie.isLock;
                return (
                  <CarouselItem
                    key={movie.id}
                    className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <div
                      onClick={() => router.push(`/movies/${movie.id}`)}
                      className="group relative aspect-2/3 cursor-pointer overflow-hidden rounded-lg bg-zinc-900 border border-white/5 transition-all"
                    >
                      {/* Clean Poster */}
                      <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Simple Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />

                      {/* Lock/Play Icon Center (Only shows on hover) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        {isLocked ? (
                          <Lock className="h-8 w-8 text-amber-500" />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                            <Play className="h-6 w-6 text-black fill-current ml-1" />
                          </div>
                        )}
                      </div>

                      {/* Badge (Top Right) */}
                      {isLocked && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded text-black">
                          PRO
                        </div>
                      )}

                      {/* Basic Info (Bottom) */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="truncate text-xs font-bold text-white uppercase tracking-tight">
                          {movie.title}
                        </h3>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* Simple Arrows */}
            <CarouselPrevious className="hidden md:flex -left-4 border-none bg-zinc-900 text-white hover:bg-amber-500 hover:text-black" />
            <CarouselNext className="hidden md:flex -right-4 border-none bg-zinc-900 text-white hover:bg-amber-500 hover:text-black" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default PremiumMovieCard;
