import {
  getGenresMovies,
  getMoviesByGenres,
} from "@/api/endpoints/getGenresMovies";
import type { Genres } from "@/types/genres";
import type { Movies } from "@/types/movies";
import { useQuery } from "@tanstack/react-query";

export function useGetGenresMovies() {
  return useQuery<Genres[]>({
    queryKey: ["genresMovies"],
    queryFn: ({ signal }) => getGenresMovies(signal),
  });
}

export function useGetMoviesByGenres(genresId: string) {
  return useQuery<{ results: Movies[]; page: number; total_pages: number }>({
    queryKey: ["moviesByGenres", genresId],
    queryFn: ({ signal }) => getMoviesByGenres(genresId, signal),
    enabled: !!genresId,
  });
}
