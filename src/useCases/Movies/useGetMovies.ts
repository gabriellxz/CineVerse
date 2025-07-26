import { getSearchMovies, getPopularMovies, getTopRatedMovies, getVideosMovies } from "@/api/endpoints/getMovies";
import type { Movies } from "@/types/movies";
import type { Videos } from "@/types/videos";
import { useQuery } from "@tanstack/react-query";

export function useGetPopularMovies() {
    return useQuery<Movies[]>({
        queryKey: ["movies"],
        queryFn: getPopularMovies
    })
}

export function useGetToRatedMovies() {
    return useQuery<Movies[]>({
        queryKey: ["popularMovies"],
        queryFn: getTopRatedMovies
    })
}

export function useGetVideosMovies(movieId: number) {
    return useQuery<Videos[]>({
        queryKey: ["video"],
        queryFn: () => getVideosMovies(movieId),
        enabled: false
    })
}

export function useGetSearchMovies(search: string) {
    return useQuery<Movies[]>({
        queryKey: ["searchMovies"],
        queryFn: () => getSearchMovies(search),
        enabled: false
    })
}