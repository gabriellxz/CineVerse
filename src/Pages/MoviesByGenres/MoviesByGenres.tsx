import { Button } from "@/components/ui/button";
import { api } from "@/config/api";
import type { Movies } from "@/types/movies";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function MoviesByGenres() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const genreId = searchParams.get("genreId");
    const genreName = searchParams.get("genreName");

    const language = localStorage.getItem("@cn_language")

    const [moviesByGenres, setMoviesByGenres] = useState<Movies[]>([]);

    useEffect(() => {
        async function getMoviesByGenres() {
            try {
                const response = await api.get(`/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreId}&language=${language}`);
                console.log(response.data);
                setMoviesByGenres(response.data.results);
            } catch (error) {
                console.error("Error fetching movies by genres:", error);
            }
        }

        getMoviesByGenres();
    }, [])

    return (
        <div className="p-5">
            <div className="w-full flex gap-5 items-center">
                <Button onClick={() => navigate("/")}>Voltar</Button>
                <div className="w-full flex flex-col m-5">
                    <h1 className="text-white text-2xl font-bold uppercase">{genreName}</h1>
                    <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                {
                    moviesByGenres.map((movie: Movies) => (
                        <div key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}