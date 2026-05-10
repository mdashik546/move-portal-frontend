import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { MovieCardProps } from "@/types/movie.types";

const MovieCard = ({ movie }: { movie: MovieCardProps }) => {
  console.log(movie.videoUrl);
  return (
    <div className="max-w-sm bg-zinc-900 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 group border border-zinc-800">
      {/* Poster Section */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={movie?.posterUrl}
          alt={movie?.title}
          className="w-full h-full object-cover group-hover:opacity-40 transition-opacity duration-300"
          width={300}
          height={400}
        />

        {/* Premium Badge */}
        {movie.isPremium && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow-md">
            PREMIUM
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white truncate w-3/4">
            {movie.title}
          </h3>
          <span className="text-zinc-400 text-sm flex items-center gap-1">
            <Calendar size={14} /> {movie.releaseYear}
          </span>
        </div>

        <p className="text-zinc-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {movie.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-zinc-800 text-zinc-300 text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-zinc-700">
            {movie.genre}
          </span>
        </div>

        <hr className="border-zinc-800 mb-4" />

        {/* Footer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <User size={14} />
            <span className="text-xs truncate max-w-20 italic">
              {movie.director}
            </span>
          </div>

          <div className="text-right">
            <p className="text-green-400 font-bold text-lg">{movie.price} TK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
