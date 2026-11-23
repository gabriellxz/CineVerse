import Header from "./Layouts/Header/Header";
import SlidersMovie from "./Sections/MainPage/SlidersMovie/SlidersMovie";
import PopularMovies from "./Sections/MainPage/PopularMovies/PopularMovies";
import TopRated from "./Sections/MainPage/TopRated/TopRated";
import MoviesGenres from "./Sections/MainPage/MoviesGenres/MoviesGenres";
import {
  useGetNowPlayingMovies,
  useGetPopularMovies,
  useGetUpcomingMovies,
} from "./useCases/Movies/useGetMovies";
import MovieSection from "./Sections/MainPage/MovieSection";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetPopularMovies(page);
  const nowPlaying = useGetNowPlayingMovies();
  const upcoming = useGetUpcomingMovies();

  return (
    <div>
      <Header />

      <main>
        <section className="w-full">
          <SlidersMovie
            isLoading={isLoading}
            isFetching={false}
            movies={data?.results}
          />
        </section>

        <section className="w-full pb-12">
          <MoviesGenres />
          <TopRated />
          <PopularMovies
            isLoading={isLoading}
            isFetching={false}
            movies={data?.results}
          />
          <MovieSection
            title="Em cartaz"
            movies={nowPlaying.data}
            isLoading={nowPlaying.isLoading}
          />
          <MovieSection
            title="Em breve"
            movies={upcoming.data}
            isLoading={upcoming.isLoading}
          />
          <div className="mx-auto flex max-w-7xl justify-center px-6 pb-8">
            {error && (
              <p role="alert" className="mr-4 self-center text-sm text-red-300">
                Não foi possível carregar os filmes.
              </p>
            )}
            {page < (data?.total_pages ?? 1) && (
              <button
                className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
                disabled={isFetching}
                onClick={() => setPage((current) => current + 1)}
              >
                {isFetching ? "Carregando…" : "Carregar mais populares"}
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#09090d] px-6 py-7 text-center text-sm text-zinc-500">
        <p>
          © CineVerse · Dados e imagens fornecidos por{" "}
          <a
            className="text-zinc-300 underline underline-offset-4"
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
        </p>
        <p className="mt-2 text-xs">
          Este produto usa a API do TMDB, mas não é endossado nem certificado
          pelo TMDB.
        </p>
      </footer>
    </div>
  );
}

export default App;
