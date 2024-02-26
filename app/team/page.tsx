import { OrganizationList, OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
import { Card as CardTremor, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { Card, CardContent } from "../../@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../@/components/ui/carousel"


export default function TeamPage() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                <div className="mt-5 mb-10 ml-5">
                    <CardTremor>
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            className="space-x-2"
                        >
                            <OrganizationSwitcher />
                        </Flex>
                    </CardTremor>
                </div>
                
            <div>
            <div className="ml-5">Click/Drag to scroll possible teammates</div>
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            </div>
            </Grid>
        </main>
    );
}