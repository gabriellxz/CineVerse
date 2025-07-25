import { api } from "@/config/api";

export async function getGenresMovies() {
    const response = await api.get(`/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
    return response.data.genres
}

export async function getMoviesByGenres(genreId: string) {
    const response = await api.get(`/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreId}&language=pt-BR`)
    return response.data.results
}