import type { Movies } from "@/types/movies";
import * as motion from "motion/react-client"
import { useNavigate } from "react-router-dom";

interface Props {
    movie: Movies
    className?: string;
    handleModalOpenChange?: (showTrailer: boolean) => void;
}

export default function CardMovie({ movie, className, handleModalOpenChange }: Props) {

    const navigate = useNavigate()

    function onNavigateDetailsMovie(movieName: string, movieId: number) {
        const query = new URLSearchParams()
        query.set("movieName", movieName)
        query.set("movieId", movieId.toString())
        navigate(`/movie-details?${query.toString()}`)

        if (handleModalOpenChange) {
            handleModalOpenChange(false)
        }
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