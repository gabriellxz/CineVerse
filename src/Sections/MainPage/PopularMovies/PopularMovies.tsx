import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Movies } from "@/types/movies";
import * as motion from "motion/react-client"

interface Props {
    movies: Movies[] | undefined;
}

export default function PopularMovies({ movies }: Props) {
    return (
        <>
            <div className="flex flex-col m-5">
                <h1 className="text-white text-2xl font-bold uppercase">Filmes populares</h1>
                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
            </div>
            <div className="mt-4">
                <Carousel className="w-full overflow-hidden relative">
                    <CarouselContent className="-ml-1">
                        {movies?.map((movie: Movies) => (
                            <CarouselItem key={movie.id} className="pl-1 basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/8">
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    className="p-1"
                                >
                                    <div>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    </div>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-white absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md">
                        <span className="text-white">&lt;</span>
                    </CarouselPrevious>
                    <CarouselNext className="text-white absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md">
                        <span className="text-white">&gt;</span>
                    </CarouselNext>
                </Carousel>
            </div>
        </>
    )
}