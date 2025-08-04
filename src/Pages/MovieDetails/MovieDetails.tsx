import CardMovie from "@/components/CardMovie/CardMovie"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Movies } from "@/types/movies"
import { useGetMovieById, useGetPopularMovies, useGetVideosMovies } from "@/useCases/Movies/useGetMovies"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { IoMdClose } from "react-icons/io";

export default function MovieDetails() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const movieId = searchParams.get("movieId")

    const { data: movieDetails, isLoading, isFetching } = useGetMovieById(movieId ?? "")

    const { data: movies } = useGetPopularMovies()
    const filterMovie = movies?.filter((movie: Movies) => movie.id !== Number(movieId))

    const [selectedMovieId, setSelectedMovieId] = useState("");

    //estado para monitorar se o modal está aberto ou fechado (o modal não depende desse estado para abrir ou fechae)
    const [showTrailer, setShowTrailer] = useState(false)

    const { data: videoMovie, refetch: fetchVideo } = useGetVideosMovies(selectedMovieId ?? "");

    const getVidesMovies = async (id: string) => {
        setSelectedMovieId(id);
        await fetchVideo()
        setShowTrailer(true)
    };

    const handleModalOpenChange = (showTrailer: boolean) => {
        if (!open) {
            setSelectedMovieId("")
        }

        setShowTrailer(showTrailer)
    }

    if (isLoading || isFetching) {
        return (
            <div>
                {/* Seção do banner */}
                <div className="relative">
                    <Skeleton className="absolute m-7 h-10 w-24 rounded-md z-10 bg-zinc-700" />

                    {/* Banner */}
                    <Skeleton className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-b-2xl bg-zinc-700" />

                    {/* Overlay do banner */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black/65 flex flex-col items-start justify-end p-7 gap-3">
                        <Skeleton className="h-12 w-full max-w-[80%] rounded-md bg-zinc-700" />
                        <Skeleton className="h-12 w-48 rounded-md bg-zinc-700" />
                    </div>
                </div>

                {/* Seção de detalhes */}
                <div className="text-white m-5 flex flex-col gap-5">
                    {/* Título e avaliação */}
                    <div className="flex gap-5 items-center">
                        <Skeleton className="h-6 w-48 rounded-md bg-zinc-700" />
                        <Skeleton className="h-6 w-10 rounded-md bg-zinc-700" />
                    </div>

                    {/* País e data */}
                    <div className="flex gap-5 items-center">
                        <Skeleton className="h-5 w-24 rounded-md bg-zinc-700" />
                        <Skeleton className="h-5 w-24 rounded-md bg-zinc-700" />
                    </div>

                    {/* Sinopse */}
                    <div>
                        <Skeleton className="h-5 w-20 mb-2 rounded-md bg-zinc-700" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full rounded-md bg-zinc-700" />
                            <Skeleton className="h-4 w-full rounded-md bg-zinc-700" />
                            <Skeleton className="h-4 w-3/4 rounded-md bg-zinc-700" />
                        </div>
                    </div>

                    <Skeleton className="w-full max-w-[500px] h-[1px] bg-zinc-700" />

                    {/* Recomendações */}
                    <div>
                        <Skeleton className="h-5 w-48 mb-4 rounded-md bg-zinc-700" />
                        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className="w-full aspect-[2/3] rounded-lg bg-zinc-700" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="relative">
                {
                    !showTrailer &&
                    <Button className="absolute m-7 bg-transparent border-[1px] border-white z-10" onClick={() => navigate("/")}>
                        Voltar
                    </Button>
                }
                {
                    showTrailer &&
                    <div className="relative">
                        <Button className="absolute m-5" onClick={() => handleModalOpenChange(false)}>
                            <IoMdClose />
                        </Button>
                        <iframe
                            className="w-full object-cover rounded-b-2xl h-[300px] sm:h-[500px]"
                            src={`https://www.youtube.com/embed/${videoMovie && videoMovie[0] && videoMovie[0].key}?autoplay=1`}
                            allowFullScreen
                        />
                    </div>
                }
                {
                    !showTrailer &&
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path}`}
                            alt={movieDetails?.title}
                            className="w-full object-cover rounded-b-2xl"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/65 flex flex-col items-start justify-end p-7 gap-3">
                            <p className="text-white font-bold text-xl sm:text-3xl md:text-5xl lg:text-7xl">
                                {movieDetails?.title}
                            </p>
                            <Button onClick={() => getVidesMovies(String(movieDetails?.id) ?? "")} className="md:p-7 sm:text-xl font-bold bg-transparent border-[1px] border-white">
                                Assistir trailer
                            </Button>
                        </div>
                    </>
                }
            </div>
            <div className="text-white m-5 flex flex-col gap-5">
                <div className="flex gap-5 items-center">
                    <p className="text-xl font-bold">{movieDetails?.title}</p>
                    <p className="text-yellow-500">{movieDetails?.vote_average.toFixed(1)}</p>
                </div>
                <div className="flex gap-5 items-center">
                    <p>{movieDetails?.origin_country}</p>
                    <p>{movieDetails?.release_date}</p>
                </div>
                <div>
                    <p className="font-bold">Sinopse</p>
                    <p className="text-justify text-zinc-400">{movieDetails?.overview}</p>
                </div>
                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
                <div>
                    <p className="font-bold">Você também pode gostar</p>
                    <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                        {
                            filterMovie?.slice(0, 10).map((movie: Movies) => (
                                <CardMovie movie={movie} key={movie.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}