import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SkeletonCarousel from "@/Layouts/SkeletonCarousel/SkeletonCarousel";
import type { Genres } from "@/types/genres";
import { useGetGenresMovies } from "@/useCases/Genres/useGetGenresMovies";
import { useNavigate } from "react-router-dom";

export default function MoviesGenres() {

    const navigate = useNavigate();
    const genreColorMap: { [key: number]: string } = {
        28: "#FF5252",
        12: "#4CAF50",
        16: "#FFEB3B",
        35: "#FF9800",
        80: "#607D8B",
        99: "#795548",
        18: "#9C27B0",
        10751: "#00BCD4",
        14: "#673AB7",
        36: "#CDDC39",
        27: "#212121",
        10402: "#E91E63",
        9648: "#3F51B5",
        10749: "#FF4081",
        878: "#00B8D4",
        10770: "#9E9E9E",
        53: "#F44336",
        10752: "#8D6E63",
        37: "#D2691E"
    };

    function onNavigateToGenre(genreId: number, genreName: string) {
        const query = new URLSearchParams();
        query.set("genreId", genreId.toString());
        query.set("genreName", genreName);

        navigate(`/movies?${query.toString()}`);
    }

    const { data: moviesGenres, isLoading, isFetching } = useGetGenresMovies()

    if(isLoading || isFetching) {
        return <SkeletonCarousel 
            className="p-1 h-[100px] rounded-xl"
            title="Gêneros"
        />
    }

    return (
        <div className="m-5">
            <div className="flex flex-col">
                <h1 className="text-white text-2xl font-bold uppercase">Gêneros</h1>
                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
            </div>
            <div className="mt-4">
                <Carousel className="w-full overflow-hidden relative">
                    <CarouselContent className="-ml-1 flex gap-4">
                        {moviesGenres?.map((genre: Genres) => (
                            <CarouselItem onClick={() => onNavigateToGenre(genre.id, genre.name)} key={genre.id} className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5 xl:basis-1/8 select-none">
                                <div className={`p-1 h-[100px] rounded-xl flex justify-center items-center text-2xl`} style={{ backgroundColor: genreColorMap[genre.id] }}>
                                    <h2 className="text-white font-bold">{genre.name}</h2>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden text-white absolute left-0 z-10 md:flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md">
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