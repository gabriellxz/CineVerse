import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: import.meta.env.VITE_TMDB_TOKEN
    ? {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      }
    : undefined,
});

if (import.meta.env.VITE_TMDB_API_KEY) {
  api.defaults.params = { api_key: import.meta.env.VITE_TMDB_API_KEY };
}
