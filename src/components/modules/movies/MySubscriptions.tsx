/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Error from "@/app/error";
import LoadingState from "@/components/shared/Loading";
import { movieService } from "@/services/movie.service";
import { MovieCardProps } from "@/types/movie.types";
import { useQuery } from "@tanstack/react-query";
import { Ticket, Calendar, Play, AlertCircle } from "lucide-react";
import Image from "next/image";

const MySubscriptions = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["my-library"],
    queryFn: movieService.getMyMovies,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <Error error={error as Error} reset={refetch} />;

  const subscriptions = data?.data ?? [];
  console.log(subscriptions);
  const handleWatchMovie = (movie: MovieCardProps) => {
    if (!movie.videoUrl) return;
    window.open(movie.videoUrl, "_blank");
  };
  return (
    <div className="py-40 bg-black text-white  px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Ticket className="text-amber-500 h-8 w-8" />
            MY SUBSCRIPTIONS
          </h1>
          <p className="text-zinc-500 mt-2">
            Manage your purchased premium movies and active plans.
          </p>
        </div>

        <div className="space-y-5">
          {subscriptions.map((movie: any) => {
            const isExpired =
              movie.subscriptionEnd &&
              new Date(movie.subscriptionEnd) < new Date();
            return (
              <div
                key={movie.id}
                className={`relative overflow-hidden rounded-2xl border ${
                  !isExpired
                    ? "border-zinc-700 bg-zinc-900/40"
                    : "border-zinc-800 bg-zinc-950/20 opacity-70"
                } p-5 flex flex-col md:flex-row items-center gap-6 transition-all hover:border-zinc-600`}
              >
                {/* Poster */}
                <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-800">
                  <Image
                    width={128}
                    height={96}
                    src={movie?.posterUrl}
                    alt={movie?.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{movie?.title}</h3>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold w-fit mx-auto md:mx-0 ${
                        !isExpired
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      Active
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs text-zinc-500 mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      Purchased:
                      <span className="text-zinc-300">
                        {new Date(movie.createdAt).toDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Expires:
                      <span className="text-zinc-300">
                        {new Date(movie.subscriptionEnd).toDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="shrink-0 w-full md:w-auto">
                  {!isExpired ? (
                    <button
                      onClick={() => handleWatchMovie(movie)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 font-bold text-black transition-colors hover:bg-zinc-200 md:w-auto"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      Watch Now
                    </button>
                  ) : (
                    <button className="w-full md:w-auto rounded-full border border-zinc-700 px-6 py-2.5 font-bold text-zinc-500 cursor-not-allowed">
                      Expired
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MySubscriptions;
