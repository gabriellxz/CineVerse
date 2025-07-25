import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
    title: string;
    className: string
}

export default function SkeletonCarousel({ title, className }: Props) {
    return (
        <>
            <div className="flex flex-col m-5">
                <h1 className="text-white text-2xl font-bold uppercase">{title}</h1>
                <span className="w-full max-w-[500px] p-[0.5px] bg-white"></span>
            </div>
            <div className="mt-4">
                <Carousel className="w-full overflow-hidden relative">
                    <CarouselContent className="-ml-1">
                        {[...Array(10)].map((_, index) => (
                            <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/8">
                                <div className={className}>
                                    <div className="relative">
                                        <Skeleton className="w-full aspect-[2/3] bg-zinc-700" />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-white absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md">
                        <span className="text-white">&lt;</span>
                    </CarouselPrevious>
                    <CarouselNext className="text-white absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-transparent rounded-full shadow-md">
                        <span className="text-white">&gt;</span>
                    </CarouselNext>
                </Carousel>
            </div>
        </>
    )
}