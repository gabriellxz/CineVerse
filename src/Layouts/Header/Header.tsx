import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#09090d]/85 px-5 backdrop-blur-xl">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5"
      >
        <button
          onClick={() => navigate("/")}
          className="text-xl font-black tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400 sm:text-2xl"
        >
          Cine<span className="text-violet-400">Verse</span>
        </button>
        <div className="hidden items-center gap-6 text-sm text-zinc-400 sm:flex">
          <button className="hover:text-white" onClick={() => navigate("/")}>
            Início
          </button>
          <button
            className="hover:text-white"
            onClick={() => navigate("/search")}
          >
            Explorar
          </button>
        </div>
        <button
          aria-label="Buscar filmes"
          onClick={() => navigate("/search")}
          className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-zinc-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Buscar filmes</span>
        </button>
      </nav>
    </header>
  );
}
