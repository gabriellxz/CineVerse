import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonMoviesByGenres() {
    return (
        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
            {
                [...Array(10)]?.map((_, index) => (
                    <div key={index}>
                        <Skeleton className="aspect-[2/3] w-full bg-zinc-700"/>
                    </div>
                ))
            }
        </div>
    )
}