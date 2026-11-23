import { api } from "@/config/api";

export async function getGenresMovies(signal?: AbortSignal) {
  const response = await api.get(`/genre/movie/list`, {
    params: { language: "pt-BR" },
    signal,
  });
  return response.data.genres;
}

export async function getMoviesByGenres(genreId: string, signal?: AbortSignal) {
  const response = await api.get(`/discover/movie`, {
    params: { with_genres: genreId, language: "pt-BR" },
    signal,
  });
  return response.data;
}
