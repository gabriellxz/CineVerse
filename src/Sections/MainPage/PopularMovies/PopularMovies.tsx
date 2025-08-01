import CardMovie from "@/components/CardMovie/CardMovie";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SkeletonCarousel from "@/Layouts/SkeletonCarousel/SkeletonCarousel";
import type { Movies } from "@/types/movies";

interface Props {
    movies: Movies[] | undefined;
    isLoading: boolean;
    isFetching: boolean
}

export default function PopularMovies({ movies, isLoading, isFetching }: Props) {

    if (isLoading || isFetching) {
        return (
            <SkeletonCarousel
                title="Filmes populares"
                className="p-1"
            />
        )
    }

    return (
        <div className="m-5">
            <div className="flex flex-col">
                <h1 className="text-white text-2xl font-bold uppercase">Filmes populares</h1>
                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
            </div>
            <div className="mt-4">
                <Carousel className="w-full overflow-hidden relative">
                    <CarouselContent className="-ml-1">
                        {movies?.map((movie: Movies) => (
                            <CarouselItem key={movie.id} className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5 xl:basis-1/8">
                                <CardMovie movie={movie} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden text-white absolute left-0 z-10 sm:flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md">
                        <span className="text-white">&lt;</span>
                    </CarouselPrevious>
                    <CarouselNext className="hidden text-white absolute right-0 z-10 md:flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md">
                        <span className="text-white">&gt;</span>
                    </CarouselNext>
                </Carousel>
            </div>
        </div>
    )
}