import { Button } from "@/components/ui/button";
import SkeletonSliders from "@/Layouts/SkeletonSliders/SkeletonSliders";
import type { Movies } from "@/types/movies";
import { useNavigate } from "react-router-dom";

interface Props {
  movies?: Movies[];
  isLoading: boolean;
  isFetching: boolean;
}

export default function SlidersMovie({ movies, isLoading, isFetching }: Props) {
  const navigate = useNavigate();
  if (isLoading || isFetching) return <SkeletonSliders />;
  const featured = movies?.[0];
  if (!featured)
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-6 text-zinc-300">
        <p>
          Não foi possível carregar o destaque agora. Tente novamente em
          instantes.
        </p>
      </div>
    );
  const backdrop = featured.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
    : null;
  return (
    <section className="hero relative flex min-h-[540px] items-end overflow-hidden sm:min-h-[620px] lg:min-h-[700px]">
      {backdrop && (
        <img
          src={backdrop}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090d] via-[#09090d]/65 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-transparent to-[#09090d]/40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-36 sm:pb-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-[.28em] text-violet-300">
          Destaque da semana
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {featured.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-300">
          <span className="text-amber-300">
            ★ {featured.vote_average.toFixed(1)}
          </span>
          <span>•</span>
          <span>{featured.release_date?.slice(0, 4)}</span>
        </div>
        <p className="mt-5 line-clamp-3 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
          {featured.overview ||
            "Descubra mais sobre este título e explore o universo do cinema."}
        </p>
        <Button
          onClick={() => navigate(`/movie-details?movieId=${featured.id}`)}
          className="mt-7 rounded-full bg-violet-500 px-6 py-5 font-semibold text-white hover:bg-violet-400"
        >
          Ver detalhes
        </Button>
      </div>
    </section>
  );
}
