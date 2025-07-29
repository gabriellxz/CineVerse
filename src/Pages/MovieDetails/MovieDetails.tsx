import CardMovie from "@/components/CardMovie/CardMovie"
import { Button } from "@/components/ui/button"
import Modal from "@/Layouts/Modal/Modal"
import type { Movies } from "@/types/movies"
import { useGetMovieById, useGetPopularMovies, useGetVideosMovies } from "@/useCases/Movies/useGetMovies"
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function MovieDetails() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    // const movieName = searchParams.get("movieName")
    const movieId = searchParams.get("movieId")

    const { data: movieDetails } = useGetMovieById(movieId ?? "")
    const { data: movies } = useGetPopularMovies()

    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    //estado para monitorar se o modal está aberto ou fechado (o modal não depende desse estado para abrir ou fechae)
    const [openModal, setOpenModal] = useState(false)

    const { data: videoMovie, refetch: fetchVideo } = useGetVideosMovies(selectedMovieId ?? 0);

    const getVidesMovies = async (id: number) => {
        setSelectedMovieId(id);
        await fetchVideo()
        setOpenModal(true)
    };

    const handleModalOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedMovieId(null)
        }

        setOpenModal(open)
    }

    return (
        <div>
            <div className="relative">
                <Button className="absolute m-7 bg-transparent border-[1px] border-white z-10" onClick={() => navigate("/")}>
                    Voltar
                </Button>
                <img
                    src={`https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path}`}
                    alt={movieDetails?.title}
                    className="w-full object-cover rounded-b-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/65 flex flex-col items-start justify-end p-7 gap-3">
                    <p className="text-white font-bold text-xl sm:text-3xl md:text-5xl lg:text-7xl">
                        {movieDetails?.title}
                    </p>
                    <Modal open={openModal} onOpenChange={handleModalOpenChange}>
                        <DialogTrigger>
                            <Button onClick={() => getVidesMovies(Number(movieId))} className="md:p-7 sm:text-xl font-bold bg-transparent border-[1px] border-white">
                                Assistir trailer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[800px] max-sm:max-w-[95vw] w-full p-0 bg-neutral-900 rounded-lg border-none">
                            <iframe
                                className="w-full aspect-video rounded-t-lg"
                                src={`https://www.youtube.com/embed/${videoMovie && videoMovie[movieDetails?.id ?? 0] && videoMovie[movieDetails?.id ?? 0].key}?autoplay=1`}
                                allowFullScreen
                            />
                        </DialogContent>
                    </Modal>
                </div>
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
                            movies?.slice(0, 6).map((movie: Movies) => (
                                <CardMovie movie={movie}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}