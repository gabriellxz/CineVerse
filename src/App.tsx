import Header from "./Layouts/Header/Header";
import SlidersMovie from "./Sections/MainPage/SlidersMovie/SlidersMovie";
import PopularMovies from "./Sections/MainPage/PopularMovies/PopularMovies"
import TopRated from "./Sections/MainPage/TopRated/TopRated";
import MoviesGenres from "./Sections/MainPage/MoviesGenres/MoviesGenres";
import { useGetPopularMovies } from "./useCases/Movies/useGetMovies";

function App() {
  const { data: movies, isLoading, isFetching } = useGetPopularMovies()

  return (
    <>
      <Header />

      <section className="w-full">
        <SlidersMovie
          isLoading={isLoading}
          isFetching={isFetching}
          movies={movies}
        />
      </section>

      <section className="w-full">
        <MoviesGenres />
        <TopRated />
        <PopularMovies
          isLoading={isLoading}
          isFetching={isFetching}
          movies={movies}
        />
      </section>
    </>
  );
}

export default App
