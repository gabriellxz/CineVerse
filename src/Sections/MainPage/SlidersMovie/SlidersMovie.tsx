import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Modal from "@/Layouts/Modal/Modal";
import SkeletonSliders from "@/Layouts/SkeletonSliders/SkeletonSliders";
import type { Movies } from "@/types/movies";
import { useGetVideosMovies } from "@/useCases/Movies/useGetMovies";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

interface Props {
    movies: Movies[] | undefined;
    isLoading: boolean;
}

export default function SlidersMovie({ movies, isLoading }: Props) {

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

    if (isLoading) {
        return <SkeletonSliders />
    }

    return (
        <div className="w-full">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000
                    })
                ]}
                className="w-full relative overflow-hidden"
            >
                <CarouselContent>
                    {
                        movies?.slice(2, 7).map((movie: Movies) => (
                            <CarouselItem key={movie.id} className="relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className="w-full object-cover"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-black/65 flex flex-col items-start justify-end p-7 gap-3">
                                    <p className="text-white font-bold text-xl sm:text-3xl md:text-5xl lg:text-7xl">
                                        {movie.title}
                                    </p>
                                    <Modal open={openModal} onOpenChange={handleModalOpenChange}>
                                        <DialogTrigger>
                                            <Button onClick={() => getVidesMovies(movie.id)} className="md:p-7 sm:text-xl font-bold">
                                                Assistir trailer
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[800px] max-sm:max-w-[95vw] w-full p-0 bg-neutral-900 rounded-lg border-none">
                                            <iframe
                                                className="w-full aspect-video rounded-t-lg"
                                                src={`https://www.youtube.com/embed/${videoMovie && videoMovie[0].key}?autoplay=1`}
                                                allowFullScreen
                                            />
                                        </DialogContent>
                                    </Modal>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div >
    )
}