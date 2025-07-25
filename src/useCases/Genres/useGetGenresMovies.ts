import { getGenresMovies, getMoviesByGenres } from "@/api/endpoints/getGenresMovies";
import type { Genres } from "@/types/genres";
import type { Movies } from "@/types/movies";
import { useQuery } from "@tanstack/react-query";

export function useGetGenresMovies() {
    return useQuery<Genres[]>({
        queryKey: ["genresMovies"],
        queryFn: getGenresMovies
    })
}

export function useGetMoviesByGenres(genresId: string) {
    return useQuery<Movies[]>({
        queryKey: ["moviesByGenres"],
        queryFn: () => getMoviesByGenres(genresId)
    })
}