import { useState } from "react";
import Header from "./Layouts/Header/Header";
import SlidersMovie from "./Sections/MainPage/SlidersMovie/SlidersMovie";
import PopularMovies from "./Sections/MainPage/PopularMovies/PopularMovies"
import TopRated from "./Sections/MainPage/TopRated/TopRated";
import MoviesGenres from "./Sections/MainPage/MoviesGenres/MoviesGenres";
import { useGetPopularMovies } from "./useCases/Movies/useGetMovies";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("@cn_language")
  })

  const { data: movies  } = useGetPopularMovies()

  return (
    <>
      <Header selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />

      <section className="w-full">
        <SlidersMovie movies={movies} />
      </section>

      <section className="w-full">
        <MoviesGenres selectedLanguage={selectedLanguage} />
        <TopRated />
        <PopularMovies movies={movies} />
      </section>
    </>
  );
}

export default App
