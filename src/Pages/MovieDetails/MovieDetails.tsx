import { Button } from "@/components/ui/button";
import Header from "@/Layouts/Header/Header";
import {
  useGetMovieById,
  useGetVideosMovies,
} from "@/useCases/Movies/useGetMovies";
import { ArrowLeft, Play, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function MovieDetails() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const movieId = params.get("movieId") ?? "";
  const { data: movie, isLoading, isError } = useGetMovieById(movieId);
  const { data: videos } = useGetVideosMovies(movieId);
  const [playing, setPlaying] = useState(false);
  const trailer =
    videos?.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ?? videos?.find((video) => video.site === "YouTube");
  if (isLoading)
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl animate-pulse px-6 py-10">
          <div className="h-[50vh] rounded-3xl bg-white/10" />
          <div className="mt-8 h-10 w-1/2 rounded bg-white/10" />
          <div className="mt-4 h-24 rounded bg-white/10" />
        </main>
      </>
    );
  if (isError || !movie)
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-20">
          <p role="alert" className="text-zinc-300">
            Não foi possível carregar os detalhes deste filme.
          </p>
          <Button className="mt-5" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </main>
      </>
    );
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  return (
    <>
      <Header />
      <main className="max-w-full overflow-x-clip pb-16">
        <section className="relative min-h-[430px] w-full max-w-full overflow-hidden sm:min-h-[540px]">
          {backdrop && (
            <img
              src={backdrop}
              alt=""
              fetchPriority="high"
              className="absolute inset-0 block h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-[#09090d]/60 to-[#09090d]/20" />
          <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-end px-6 pb-12 pt-24 sm:min-h-[540px] sm:pb-16">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-6 top-8 flex items-center gap-2 text-sm text-white hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <ArrowLeft size={18} /> Voltar
            </button>
            <div className="flex min-w-0 max-w-full items-end gap-6">
              <div className="hidden w-40 shrink-0 overflow-hidden rounded-xl shadow-2xl sm:block md:w-52">
                {poster ? (
                  <img
                    src={poster}
                    alt={`Pôster de ${movie.title}`}
                    className="w-full"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center bg-zinc-800 p-3 text-center text-sm text-zinc-300">
                    {movie.title}
                  </div>
                )}
              </div>
              <div className="min-w-0 max-w-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
                  {movie.tagline}
                </p>
                <h1 className="mt-2 max-w-3xl break-words text-4xl font-black text-white sm:text-6xl">
                  {movie.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                  <span className="inline-flex items-center gap-1 text-amber-300">
                    <Star size={15} className="fill-current" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>{movie.release_date?.slice(0, 4)}</span>
                  {movie.runtime > 0 && (
                    <>
                      <span>•</span>
                      <span>
                        {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}
                        min
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                {trailer && (
                  <Button
                    onClick={() => setPlaying(true)}
                    className="mt-6 rounded-full bg-violet-500 px-5 text-white hover:bg-violet-400"
                  >
                    <Play size={16} className="mr-2" /> Assistir trailer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[1fr_300px]">
          <div>
            <h2 className="text-lg font-semibold text-white">Sinopse</h2>
            <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
              {movie.overview || "Sinopse indisponível."}
            </p>
            <h2 className="mt-10 text-lg font-semibold text-white">
              Elenco principal
            </h2>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-3">
              {movie.credits?.cast.slice(0, 12).map((person) => (
                <article key={person.id} className="w-28 shrink-0">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5">
                    {person.profile_path ? (
                      <img
                        loading="lazy"
                        src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                        alt={person.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                        Sem foto
                      </div>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-1 text-sm font-medium text-white">
                    {person.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-zinc-500">
                    {person.character}
                  </p>
                </article>
              ))}
            </div>
          </div>
          {poster && (
            <img
              src={poster}
              alt={`Pôster de ${movie.title}`}
              loading="lazy"
              className="hidden w-full rounded-2xl shadow-xl lg:block"
            />
          )}
        </section>
        {playing && trailer && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Trailer do filme"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setPlaying(false)}
          >
            <button
              autoFocus
              onClick={() => setPlaying(false)}
              className="absolute right-6 top-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              Fechar
            </button>
            <iframe
              title={`Trailer de ${movie.title}`}
              onClick={(event) => event.stopPropagation()}
              className="aspect-video w-full max-w-5xl rounded-xl"
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </main>
    </>
  );
}
