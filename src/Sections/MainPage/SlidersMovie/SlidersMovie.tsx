import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { Movies } from "@/types/movies";
import Autoplay from "embla-carousel-autoplay";

interface Props {
    movies: Movies[];
}

export default function SlidersMovie({ movies }: Props) {
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
                        movies.slice(2, 7).map((movie: Movies) => (
                            <CarouselItem key={movie.id} className="relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className="w-full object-cover"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-black/65 flex items-end justify-start">
                                    <p className="text-white font-bold p-7 text-xl sm:text-3xl md:text-5xl lg:text-7xl">
                                        {movie.title}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}