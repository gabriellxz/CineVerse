import {
  getMovieById,
  getNowPlayingMovies,
  getPopularMovies,
  getSearchMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getVideosMovies,
} from "@/api/endpoints/getMovies";
import type { MovieDetails } from "@/types/movieDetails";
import type { Movies } from "@/types/movies";
import type { Videos } from "@/types/videos";
import { useQuery } from "@tanstack/react-query";

export function useGetPopularMovies(page = 1) {
  return useQuery<{ results: Movies[]; page: number; total_pages: number }>({
    queryKey: ["movies", "popular", page],
    queryFn: ({ signal }) => getPopularMovies(page, signal),
  });
}

export function useGetToRatedMovies() {
  return useQuery<Movies[]>({
    queryKey: ["movies", "topRated"],
    queryFn: ({ signal }) => getTopRatedMovies(signal),
  });
}

export function useGetNowPlayingMovies() {
  return useQuery<Movies[]>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: ({ signal }) => getNowPlayingMovies(signal),
  });
}

export function useGetUpcomingMovies() {
  return useQuery<Movies[]>({
    queryKey: ["movies", "upcoming"],
    queryFn: ({ signal }) => getUpcomingMovies(signal),
  });
}

export function useGetVideosMovies(movieId: string) {
  return useQuery<Videos[]>({
    queryKey: ["videos", movieId],
    queryFn: ({ signal }) => getVideosMovies(movieId, signal),
    enabled: !!movieId,
  });
}

export function useGetSearchMovies(search: string, page = 1) {
  return useQuery<{ results: Movies[]; page: number; total_pages: number }>({
    queryKey: ["movies", "search", search, page],
    queryFn: ({ signal }) => getSearchMovies(search, page, signal),
    enabled: search.trim().length > 0,
  });
}

export function useGetMovieById(movieId: string) {
  return useQuery<MovieDetails>({
    queryKey: ["movie", movieId],
    queryFn: ({ signal }) => getMovieById(movieId, signal),
    enabled: !!movieId,
  });
}
