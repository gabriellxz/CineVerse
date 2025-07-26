import Header from "./Layouts/Header/Header";
import SlidersMovie from "./Sections/MainPage/SlidersMovie/SlidersMovie";
import PopularMovies from "./Sections/MainPage/PopularMovies/PopularMovies"
import TopRated from "./Sections/MainPage/TopRated/TopRated";
import MoviesGenres from "./Sections/MainPage/MoviesGenres/MoviesGenres";
import { useGetPopularMovies } from "./useCases/Movies/useGetMovies";

function App() {
  const { data: movies, isLoading, isFetching, error } = useGetPopularMovies()

  if(error) {
    return <div>
      <p className="text-white text-center p-5">Houve um erro no processamento, verifique sua conexão ou tente mais tarde.</p>
    </div>
  }

  return (
    <div>
      <Header />

      <section className="w-full">
        <SlidersMovie
          isLoading={isLoading}
          isFetching={isFetching}
          movies={movies}
        />
      </section>

      <section className="w-full mb-7">
        <MoviesGenres />
        <TopRated />
        <PopularMovies
          isLoading={isLoading}
          isFetching={isFetching}
          movies={movies}
        />
      </section>

      <footer className="fixed z-20 bottom-0 w-full text-center text-white bg-zinc-900">
        <p>© Desenvolvido por Gabriel Silva - 2025</p>
      </footer>
    </div>
  );
}

export default App
