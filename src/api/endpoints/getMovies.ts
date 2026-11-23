import { api } from "@/config/api";

const params = { language: "pt-BR" };

export async function getPopularMovies(page = 1, signal?: AbortSignal) {
  const { data } = await api.get("/movie/popular", {
    params: { ...params, page },
    signal,
  });
  return data;
}

export async function getTopRatedMovies(signal?: AbortSignal) {
  const { data } = await api.get("/movie/top_rated", { params, signal });
  return data.results;
}

export async function getNowPlayingMovies(signal?: AbortSignal) {
  const { data } = await api.get("/movie/now_playing", { params, signal });
  return data.results;
}

export async function getUpcomingMovies(signal?: AbortSignal) {
  const { data } = await api.get("/movie/upcoming", { params, signal });
  return data.results;
}

export async function getVideosMovies(movieId: string, signal?: AbortSignal) {
  const { data } = await api.get(`/movie/${movieId}/videos`, {
    params,
    signal,
  });
  return data.results;
}

export async function getSearchMovies(
  search: string,
  page = 1,
  signal?: AbortSignal,
) {
  const { data } = await api.get("/search/movie", {
    params: { ...params, query: search, page },
    signal,
  });
  return data;
}

export async function getMovieById(movieId: string, signal?: AbortSignal) {
  const { data } = await api.get(`/movie/${movieId}`, {
    params: { ...params, append_to_response: "credits" },
    signal,
  });
  return data;
}
