import { useEffect, useState } from "react";
import { api } from "./config/api";
import Header from "./Layouts/Header/Header";
import SlidersMovie from "./Sections/MainPage/SlidersMovie/SlidersMovie";
import PopularMovies from "./Sections/MainPage/PopularMovies/PopularMovies"
import type { Movies } from "./types/movies";
import TopRated from "./Sections/MainPage/TopRated/TopRated";
import MoviesGenres from "./Sections/MainPage/MoviesGenres/MoviesGenres";

function App() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("@cn_language")
  })

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await api.get(`/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=${selectedLanguage}`);
        // console.log(response.data);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    getMovies();
  }, [selectedLanguage])

  return (
    <>
      <Header selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />

      <section className="w-full">
        <SlidersMovie movies={movies} />
      </section>

      <section className="w-full">
        <MoviesGenres selectedLanguage={selectedLanguage} />
        <TopRated selectedLanguage={selectedLanguage} />
        <PopularMovies movies={movies} />
      </section>
    </>
  );
}

export default App
