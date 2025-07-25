import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonSliders() {
    return (
        <div className="w-full">
            <Carousel className="w-full relative overflow-hidden">
                <CarouselContent>
                    {[...Array(5)].map((_, index) => (
                        <CarouselItem key={index} className="relative">
                            <Skeleton className="w-full aspect-video" />
                            <div className="absolute top-0 left-0 w-full h-full bg-zinc-700 flex flex-col items-start justify-end p-7 gap-3">
                                <Skeleton className="h-12 w-3/4 sm:h-16 md:h-20 lg:h-24 bg-zinc-800" />
                                <Skeleton className="h-10 w-48 md:h-14 md:w-56 bg-zinc-700" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div >
    )
}