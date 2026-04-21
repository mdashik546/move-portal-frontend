// "use client";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Lock } from "lucide-react";

// export function PremiumMoviesSection() {
//   const movies = [
//     { id: 1, title: "Stranger Things", year: 2016, rating: "TV-14" },
//     { id: 2, title: "The Crown", year: 2016, rating: "TV-MA" },
//     { id: 3, title: "Bridgerton", year: 2020, rating: "TV-14" },
//     { id: 4, title: "The Witcher", year: 2019, rating: "TV-MA" },
//     { id: 5, title: "Ozark", year: 2017, rating: "TV-MA" },
//     { id: 6, title: "Dark", year: 2017, rating: "TV-14" },
//     { id: 7, title: "Money Heist", year: 2017, rating: "TV-MA" },
//     { id: 8, title: "Squid Game", year: 2021, rating: "TV-MA" },
//   ];

//   return (
//     <section className="relative px-4 py-12 sm:px-6 lg:px-8">
//       <div className="app-container">
//         <div className="mb-8 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-white md:text-3xl">
//             Premium Content
//           </h2>
//           <span className="text-sm text-gray-400">
//             Exclusive for subscribers
//           </span>
//         </div>

//         {/* Carousel Container */}
//         <div className="group relative">
//           {/* Scrollable Container */}
//           <Carousel
//             // opts={{
//             //   align: "start",
//             //   loop: true,
//             // }}
//             className="w-full relative"
//           >
//             <CarouselContent className="-ml-4">
//               {movies.map((movie) => (
//                 <CarouselItem
//                   key={movie.id}
//                   className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
//                 >
//                   <div className="group/card relative cursor-pointer overflow-hidden rounded-lg">
//                     {/* Movie Poster */}
//                     <div className="relative aspect-9/16 w-full overflow-hidden bg-linear-to-br from-purple-900 to-gray-900">
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/card:opacity-100">
//                         <Lock className="h-12 w-12 text-white" />
//                       </div>
//                       <div className="absolute inset-0 opacity-0 transition-opacity group-hover/card:opacity-100">
//                         <div className="absolute inset-0 bg-linear-to-t from-black via-transparent" />
//                       </div>
//                     </div>

//                     {/* Movie Info */}
//                     <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-3">
//                       <h3 className="text-sm font-bold text-white truncate">
//                         {movie.title}
//                       </h3>
//                       <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
//                         <span>{movie.year}</span>
//                         <span className="rounded bg-gray-800 px-2 py-1 text-white">
//                           {movie.rating}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Premium Badge */}
//                     <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-primary px-2 py-1 text-[10px] font-bold text-white">
//                       <Lock className="h-3 w-3" />
//                       PREMIUM
//                     </div>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="left-0 hidden sm:flex" />
//             <CarouselNext className="right-0 hidden sm:flex" />
//           </Carousel>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Lock, Crown, Info } from "lucide-react";

export function PremiumMoviesSection() {
  const movies = [
    { id: 1, title: "Stranger Things", year: 2016, rating: "TV-14" },
    { id: 2, title: "The Crown", year: 2016, rating: "TV-MA" },
    { id: 3, title: "Bridgerton", year: 2020, rating: "TV-14" },
    { id: 4, title: "The Witcher", year: 2019, rating: "TV-MA" },
    { id: 5, title: "Ozark", year: 2017, rating: "TV-MA" },
    { id: 6, title: "Dark", year: 2017, rating: "TV-14" },
    { id: 7, title: "Money Heist", year: 2017, rating: "TV-MA" },
    { id: 8, title: "Squid Game", year: 2021, rating: "TV-MA" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with Luxury Styling */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Crown className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Exclusive Experience
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Premium Content
            </h2>
          </div>
          <span className="hidden sm:block text-xs font-medium text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
            {movies.length} Titles for You
          </span>
        </div>

        <Carousel opts={{ align: "start" }} className="group/carousel w-full">
          <CarouselContent className="-ml-3">
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="group/card relative aspect-2/3 cursor-pointer overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10 transition-all duration-500 hover:ring-amber-500/50 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)]">
                  {/* Premium Poster Mesh Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50" />
                  <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 via-zinc-950 to-black" />

                  {/* Lock Overlay on Hover */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 opacity-0 transition-all duration-300 group-hover/card:opacity-100">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/20">
                      <Lock className="h-7 w-7" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                      Unlock with Pro
                    </p>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
                    <div className="rounded-md bg-black/60 p-1.5 backdrop-blur-md border border-white/5 opacity-0 transition-opacity group-hover/card:opacity-100">
                      <Info className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-amber-500 px-2 py-1 text-[10px] font-black text-black shadow-lg">
                      <Crown className="h-3 w-3 fill-black" />
                      PREMIUM
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 bg-linear-to-t from-black via-black/80 to-transparent p-4">
                    <h3 className="text-sm font-bold text-white group-hover/card:text-amber-400 transition-colors">
                      {movie.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-3 text-[11px] font-medium text-zinc-400">
                      <span>{movie.year}</span>
                      <span className="h-1 w-1 rounded-full bg-zinc-700" />
                      <span className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-300">
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Luxury Navigation Buttons */}
          <CarouselPrevious className="absolute -left-5 top-1/2 h-12 w-12 border-white/5 bg-zinc-900/80 text-white opacity-0 transition-all hover:bg-amber-500 hover:text-black group-hover/carousel:opacity-100 -translate-y-1/2" />
          <CarouselNext className="absolute -right-5 top-1/2 h-12 w-12 border-white/5 bg-zinc-900/80 text-white opacity-0 transition-all hover:bg-amber-500 hover:text-black group-hover/carousel:opacity-100 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
