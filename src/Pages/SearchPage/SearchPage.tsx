import CardMovie from "@/components/CardMovie/CardMovie";
import { Input } from "@/components/ui/input";
import Header from "@/Layouts/Header/Header";
import { useGetSearchMovies } from "@/useCases/Movies/useGetMovies";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = window.setTimeout(
      () => setDebouncedValue(value.trim()),
      350,
    );
    return () => window.clearTimeout(timeout);
  }, [value]);
  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedValue) next.set("q", debouncedValue);
    setParams(next, { replace: true });
  }, [debouncedValue, setParams]);
  const { data, isLoading, isError } = useGetSearchMovies(debouncedValue);
  return (
    <>
      <Header />
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-violet-300">
          Explore o catálogo
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Buscar filmes
        </h1>
        <label className="relative mt-8 block max-w-2xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={19}
          />
          <Input
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Título do filme…"
            aria-label="Buscar filmes por título"
            className="h-14 rounded-2xl border-white/10 bg-white/5 pl-12 text-white placeholder:text-zinc-500 focus-visible:ring-violet-400"
          />
        </label>
        <section className="mt-10" aria-live="polite">
          {isLoading && <p className="text-zinc-400">Buscando filmes…</p>}
          {isError && (
            <p role="alert" className="text-red-300">
              A busca falhou. Confira sua conexão e tente novamente.
            </p>
          )}
          {!isLoading &&
            !isError &&
            debouncedValue &&
            !data?.results.length && (
              <p className="text-zinc-400">
                Nenhum filme encontrado para “{debouncedValue}”.
              </p>
            )}
          {!debouncedValue && (
            <p className="text-zinc-400">
              Digite um título para começar a busca.
            </p>
          )}
          {!!data?.results.length && (
            <>
              <h2 className="mb-5 text-lg font-semibold text-white">
                Resultados{" "}
                <span className="text-sm font-normal text-zinc-500">
                  ({data.results.length})
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {data.results.map((movie) => (
                  <CardMovie key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
