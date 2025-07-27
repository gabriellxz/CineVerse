import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import type { Genres } from "@/types/genres"
import type { Movies } from "@/types/movies"
import { useGetGenresMovies } from "@/useCases/Genres/useGetGenresMovies"
import { useGetPopularMovies, useGetSearchMovies } from "@/useCases/Movies/useGetMovies"
import { useState, type ChangeEvent } from "react"
import { CiSearch } from "react-icons/ci"
import { useNavigate } from "react-router-dom"

export default function SearchPage() {

    const navigate = useNavigate()

    const { data: moviesList, isLoading: loadingPopularMovies, isFetching: fetchingPopularMovies } = useGetPopularMovies()
    const { data: genres } = useGetGenresMovies()

    const [searchTerm, setSearchTerm] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const { data: listSearch, refetch: fetchSearch, isLoading, isFetching } = useGetSearchMovies(searchValue)


    function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
    }

    async function onSearchClick() {
        setSearchTerm(searchValue)
        await fetchSearch()
    }

    // Função utilitária para mapear ids de gênero para nomes
    function getGenreNames(genreIds: number[], genresList?: Genres[]) {
        if (!genresList) return []
        return genreIds
            .map(id => genresList.find(genre => genre.id === id)?.name)
            .filter(Boolean)
    }

    if (isLoading || isFetching || loadingPopularMovies || fetchingPopularMovies) {
        return (
            <div className="flex flex-col gap-3 mt-5 p-5">
                <div className="flex flex-col">
                    <h1 className="text-white text-2xl font-bold uppercase">resultados da busca</h1>
                    <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="flex items-center gap-5">
                            {/* Skeleton para o poster */}
                            <Skeleton className="w-[150px] h-[225px] rounded-md bg-gray-700" />

                            {/* Skeleton para o texto */}
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-6 w-3/4 bg-gray-700" />
                                <Skeleton className="h-4 w-1/2 bg-gray-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-5">
            <div className="flex gap-3">
                <Button onClick={() => navigate("/")}>Voltar</Button>
                <Input
                    type="text"
                    placeholder="Buscar por..."
                    className="text-white"
                    value={searchValue}
                    onChange={onChangeSearch}
                />
                <Button className="text-black bg-white" onClick={onSearchClick}>
                    <CiSearch />
                </Button>
            </div>
            <div className="flex flex-col gap-3 mt-5">
                {
                    searchTerm ? (
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="flex flex-col">
                                <h1 className="text-white text-2xl font-bold uppercase">resultados da busca</h1>
                                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                {listSearch?.map((movie: Movies) => (
                                    <div className="flex text-white text-xl items-center gap-5" key={movie.id}>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="max-w-[150px] w-full rounded-md" />
                                        <div>
                                            <div>
                                                <p className="font-bold">{movie.title}</p>
                                                <p className="text-sm text-gray-400">
                                                    {getGenreNames(movie.genre_ids, genres).join(", ")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <h1 className="text-white text-2xl font-bold uppercase">buscas populares</h1>
                                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                {
                                    moviesList?.map((movie: Movies) => (
                                        <div className="flex text-white text-xl items-center gap-5" key={movie.id}>
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="max-w-[150px] w-full rounded-md" />
                                            <div>
                                                <div>
                                                    <p className="font-bold">{movie.title}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {getGenreNames(movie.genre_ids, genres).join(", ")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}