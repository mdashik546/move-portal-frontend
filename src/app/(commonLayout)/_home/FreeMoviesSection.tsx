"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Play, Star } from "lucide-react";

export function FreeMoviesSection() {
  const movies = [
    {
      id: 1,
      title: "The Midnight Sky",
      year: 2020,
      rating: "PG-13",
      genre: "Sci-Fi",
    },
    { id: 2, title: "Don't Look Up", year: 2021, rating: "R", genre: "Comedy" },
    {
      id: 3,
      title: "Red Notice",
      year: 2021,
      rating: "PG-13",
      genre: "Action",
    },
    {
      id: 4,
      title: "Glass Onion",
      year: 2022,
      rating: "PG-13",
      genre: "Mystery",
    },
    {
      id: 5,
      title: "Murder Mystery",
      year: 2019,
      rating: "PG-13",
      genre: "Comedy",
    },
    { id: 6, title: "Bird Box", year: 2018, rating: "R", genre: "Thriller" },
    { id: 7, title: "Extraction", year: 2020, rating: "R", genre: "Action" },
    {
      id: 8,
      title: "The Adam Project",
      year: 2022,
      rating: "PG-13",
      genre: "Adventure",
    },
  ];

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Free Movies
            </h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">
              Instant Stream
            </p>
          </div>
          <button className="text-zinc-400 hover:text-white text-xs font-bold transition-colors uppercase tracking-widest">
            View All
          </button>
        </div>

        {/* Carousel with Hover Buffer */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="group/carousel relative w-full p-4 -m-4"
        >
          <CarouselContent className="-ml-1.5">
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <Card className="group relative aspect-2/3 overflow-hidden border-0 bg-zinc-900 transition-all duration-500 hover:scale-103 hover:z-50 ring-1 ring-white/10 hover:ring-green-500/50 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.5)] cursor-pointer rounded-xl">
                  {/* Poster Mesh Background */}
                  <div className="absolute inset-0 bg-linear-to-br from-zinc-800 via-zinc-950 to-black" />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/20 transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-5 w-5 fill-white" />
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-3 bg-linear-to-t from-black via-black/80 to-transparent">
                    <h3 className="truncate text-xs font-bold text-white group-hover:text-green-400 transition-colors">
                      {movie.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-2 text-[9px] font-bold text-zinc-400">
                      <span className="flex items-center gap-0.5 text-yellow-500">
                        <Star className="h-2.5 w-2.5 fill-yellow-500" /> 8.4
                      </span>
                      <span>{movie.year}</span>
                      <span className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300 ring-1 ring-inset ring-white/5">
                        {movie.rating}
                      </span>
                    </div>
                  </div>

                  {/* Small FREE Badge */}
                  <div className="absolute left-2 top-2 z-30">
                    <div className="flex items-center gap-1 rounded-md bg-green-600/90 px-1.5 py-0.5 text-[8px] font-black text-white backdrop-blur-sm border border-white/10">
                      FREE
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Luxury Navigation - Centered vertically and popping out slightly */}
          <CarouselPrevious className="absolute -left-2 top-1/2 h-9 w-9 border-white/10 bg-zinc-900/90 text-white opacity-0 transition-all hover:bg-green-600 hover:text-white group-hover/carousel:opacity-100 hidden sm:flex -translate-y-1/2" />
          <CarouselNext className="absolute -right-2 top-1/2 h-9 w-9 border-white/10 bg-zinc-900/90 text-white opacity-0 transition-all hover:bg-green-600 hover:text-white group-hover/carousel:opacity-100 hidden sm:flex -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
