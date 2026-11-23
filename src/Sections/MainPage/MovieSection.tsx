import CardMovie from "@/components/CardMovie/CardMovie";
import SkeletonCarousel from "@/Layouts/SkeletonCarousel/SkeletonCarousel";
import type { Movies } from "@/types/movies";

export default function MovieSection({
  title,
  movies,
  isLoading,
}: {
  title: string;
  movies?: Movies[];
  isLoading: boolean;
}) {
  if (isLoading) return <SkeletonCarousel title={title} className="p-1" />;
  return (
    <section className="mx-auto max-w-7xl px-6 py-5">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      <div className="movie-strip">
        {movies?.slice(0, 12).map((movie) => (
          <div className="w-36 shrink-0 sm:w-44" key={movie.id}>
            <CardMovie movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
