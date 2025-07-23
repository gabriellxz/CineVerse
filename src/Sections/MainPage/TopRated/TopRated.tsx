import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { api } from "@/config/api";
import type { Movies } from "@/types/movies";
import { useEffect, useState } from "react";

interface Props {
    selectedLanguage: string | null;
}

export default function TopRated({ selectedLanguage }: Props) {

    const [moviesTopRated, setMoviesTopRated] = useState<Movies[]>([]);

    useEffect(() => {
        async function getMoviesTopRated() {
            try {
                const response = await api.get(`/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}&language=${selectedLanguage}`);
                // console.log(response.data);
                setMoviesTopRated(response.data.results);
            } catch (error) {
                console.error("Error fetching top-rated movies:", error);
            }
        }

        getMoviesTopRated();
    }, [selectedLanguage])

    return (
        <>
            <div className="flex flex-col m-5">
                <h1 className="text-white text-2xl font-bold uppercase">Top 10</h1>
                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
            </div>
            <div className="mt-4">
                <Carousel className="w-full overflow-hidden relative">
                    <CarouselContent className="-ml-1">
                        {moviesTopRated.slice(0, 10).map((movie: Movies, index) => (
                            <CarouselItem key={movie.id} className="pl-1 basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/8">
                                <div className="p-1">
                                    <div className="relative">
                                        <div
                                            className="absolute top-0 left-0 w-40 h-40 z-10"
                                            style={{
                                                background: "radial-gradient(circle at 10% 10%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 50%)",
                                                filter: "blur(4px)", // Aumente o blur para mais difusão
                                            }}
                                        ></div>

                                        <span className="text-white absolute top-3 left-3 font-bold text-4xl z-20 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                                            {index + 1}
                                        </span>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    </div>
                                </div>
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