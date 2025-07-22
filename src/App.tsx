import { useEffect, useState } from "react";
import { api } from "./config/api";
import Header from "./Layouts/Header/Header";
import SlidersMovie from "./Sections/MainPage/SlidersMovie/SlidersMovie";
import PopularMovies from "./Sections/MainPage/PopularMovies/PopularMovies"
import type { Movies } from "./types/movies";
import TopRated from "./Sections/MainPage/TopRated/TopRated";

function App() {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await api.get(`/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`);
        // console.log(response.data);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    getMovies();
  }, [])

  return (
    <>
      <Header />

      <section className="w-full">
        <SlidersMovie movies={movies} />
      </section>

      <section className="w-full">
        <TopRated />
        <PopularMovies movies={movies} />
      </section>
    </>
  );
}

export default App
