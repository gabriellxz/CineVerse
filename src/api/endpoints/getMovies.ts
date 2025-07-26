import { api } from "@/config/api";

export async function getPopularMovies() {
    const response = await api.get(`/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
    return response.data.results
}

export async function getTopRatedMovies() {
    const response = await api.get(`/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
    return response.data.results
}

export async function getVideosMovies(movieId: number) {
    const response = await api.get(`/movie/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
    return response.data.results
}

export async function getSearchMovies(search:string) {
    const response = await api.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${search}&language=pt-BR`)
    return response.data.results
}