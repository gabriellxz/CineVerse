import type { Movies } from "@/types/movies";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface Props {
  movie: Movies;
  className?: string;
  handleModalOpenChange?: (showTrailer: boolean) => void;
}

export default function CardMovie({
  movie,
  className = "",
  handleModalOpenChange,
}: Props) {
  const navigate = useNavigate();
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  function openDetails() {
    const query = new URLSearchParams({
      movieName: movie.title,
      movieId: String(movie.id),
    });
    navigate(`/movie-details?${query}`);
    handleModalOpenChange?.(false);
  }
  return (
    <button
      type="button"
      onClick={openDetails}
      aria-label={`Ver detalhes de ${movie.title}`}
      className={`movie-card group block w-full rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${className}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950">
        {poster ? (
          <img
            src={poster}
            alt={`Pôster de ${movie.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm font-medium text-zinc-400">
            {movie.title}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 transition group-hover:opacity-100" />
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {movie.vote_average?.toFixed(1) ?? "—"}
        </span>
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <p className="line-clamp-2 text-sm font-semibold text-white">
            {movie.title}
          </p>
          <p className="mt-1 text-xs text-zinc-300">
            {movie.release_date?.slice(0, 4)}
          </p>
        </div>
      </div>
      <p className="mt-2 line-clamp-1 text-sm font-medium text-zinc-300 group-hover:text-white sm:hidden">
        {movie.title}
      </p>
    </button>
  );
}
