import type { Movies } from "@/types/movies";
import { useGetMovieById } from "@/useCases/Movies/useGetMovies";
import * as motion from "motion/react-client"
import { useNavigate } from "react-router-dom";

interface Props {
    movie: Movies
    className?: string;
}

export default function CardMovie({ movie, className }: Props) {

    const navigate = useNavigate()

    const { refetch: fetching } = useGetMovieById("")

    async function onNavigateDetailsMovie(movieName: string, movieId: number) {
        const query = new URLSearchParams()
        query.set("movieName", movieName)
        query.set("movieId", movieId.toString())
        navigate(`/movie-details?${query.toString()}`)

        return await fetching()
    }



    return (
        <>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className="p-1"
            >
                <div onClick={() => onNavigateDetailsMovie(movie.title, movie.id)}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={`rounded-md ${className}`} />
                </div>
            </motion.div>
        </>
    )
}