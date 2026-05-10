/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingState from "@/components/shared/Loading";
import { useQuery } from "@tanstack/react-query";
import { movieService } from "@/services/movie.service";
import Image from "next/image";
import { Calendar, ChevronLeft, CreditCard, Lock, Play } from "lucide-react";
import { toast } from "sonner";
import { MovieCardProps } from "@/types/movie.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserInfoProps {
  id: string;
  userInfo: { email?: string };
}
const SingleMovie = ({ userInfo, id }: UserInfoProps) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["single-movie", id],
    queryFn: () => movieService.getMovieById(id),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingState message="Polishing premium titles..." />;
  }

  const movie: MovieCardProps = data?.data;
  if (isLoading && !data) return <LoadingState />;

  if (!movie) return <div>Movie not found</div>;

  const handlePurchase = async (id: string) => {
    if (!userInfo?.email) {
      toast.error("Please log in first");
      router.push("/login");
      return;
    }

    const toastId = toast.loading("Creating payment session...");

    try {
      const res = await movieService.createPaymentSession(id);

      const stripeUrl = res?.data;

      if (!stripeUrl) {
        throw new Error("Payment URL not found");
      }

      toast.success("Redirecting to payment...", { id: toastId });
      window.location.assign(stripeUrl);
    } catch (error: any) {
      toast.error(error?.message || "Payment failed", { id: toastId });
    }
  };

  const handleWatchMovie = () => {
    if (!movie.videoUrl) return;

    window.open(movie.videoUrl, "_blank");
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black">
        {/* ================= HERO ================= */}
        <div className="relative h-[65vh] w-full overflow-hidden">
          <Image
            src={movie.posterUrl}
            alt="Backdrop"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover scale-110 opacity-25 blur-sm"
            priority
          />

          {/* cinematic overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black/40" />

          {/* back button */}
          <div className="absolute top-6 left-6 z-30">
            <Link
              href="/movies"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </div>

          {/* center play/lock */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            {movie.isLock ? (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-xl">
                <Lock className="h-9 w-9 text-amber-500" />
              </div>
            ) : (
              <button className="group flex h-24 w-24 items-center justify-center rounded-full bg-white text-black shadow-2xl hover:scale-110 transition">
                <Play
                  onClick={handleWatchMovie}
                  className="h-9 w-9 fill-current ml-1 group-hover:scale-110 transition"
                />
              </button>
            )}
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <main className="max-w-7xl mx-auto px-6 -mt-40 relative z-30 pb-24">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-4 space-y-6">
              {/* poster */}
              <div className="relative aspect-2/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={movie?.posterUrl}
                  alt={movie?.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* pricing card */}
              <div className="rounded-2xl bg-linear-to-b from-zinc-900 to-black border border-zinc-800 p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                    Premium Access
                  </span>
                  <span className="text-amber-500 text-xs font-bold flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    One Time
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-4xl font-black text-white">
                    {movie.price} TK
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1 uppercase">
                    Lifetime access
                  </p>
                </div>

                {movie.isLock ? (
                  <button
                    onClick={() => handlePurchase(movie.id)}
                    className="w-full bg-linear-to-r from-amber-500 to-yellow-400 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition active:scale-95"
                  >
                    Unlock Now
                  </button>
                ) : (
                  <button
                    onClick={handleWatchMovie}
                    className="w-full bg-white text-black py-4 rounded-xl font-black uppercase flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4 fill-current" /> Watch Now
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-8 pt-8">
              {/* badges */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[10px] uppercase border border-amber-500/20">
                  Premium
                </span>
                <span className="text-zinc-400 text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {movie.releaseYear}
                </span>
              </div>

              {/* title */}
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
                {movie.title}
              </h1>

              {/* description */}
              <div className="border-l-2 border-amber-500 pl-5 mb-10">
                <p className="text-zinc-300 text-lg italic leading-relaxed">
                  {movie.description}
                </p>
              </div>

              {/* meta */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-zinc-500 text-xs uppercase mb-2">
                    Director
                  </p>
                  <p className="text-white font-bold">{movie.director}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs uppercase mb-2">Genre</p>
                  <p className="text-white font-bold">{movie.genre}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SingleMovie;
