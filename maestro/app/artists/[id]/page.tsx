"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";

import artists from "@/data/artists.json";

import { TextEffect } from "@/components/ui/text-effect";
import { Timeline } from "@/components/ui/timeline";
// import { Carousel } from "@/components/ui/carousel";
import ImageGallery from "@/components/ui/image-gallery";
import ImageReveal from "@/components/ui/image-reveal";


const Artist = () => {
    const params = useParams();
    const artist = artists.find((a) => a.id === params.id);

    if (!artist) {
        return notFound();
    }

    const timelineData = artist.timeline?.map((item) => ({
        year: `${item.year}`,
        title: `${item.title}`,
        description: `${item.description}`,
    })) || [];

    return (
        <div className="min-h-screen pt-[72px]">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 px-4 md:px-8">
                <div className="relative w-full aspect-[3/4] sm:aspect-[5/4] md:aspect-auto md:h-[calc(100vh-104px)]">
                    <ImageReveal
                        src={artist.portrait}
                        alt={`${artist.name} portrait`}
                        className="relative rounded-lg overflow-hidden w-full aspect-[3/4] sm:aspect-[5/4] md:aspect-auto md:h-[calc(100vh-104px)] "
                        animationType="fade-translate-parallax"
                        duration={0.6}
                        delay={0.6}
                        ease={"easeInOut"}
                    />
                </div>
                <div className="md:pt-18 flex flex-col gap-6 md:gap-24 items-start justify-end">
                    <TextEffect
                        per="char"
                        preset="fade-in-blur"
                        as="h1"
                        className="text-3xl md:text-6xl xl:text-[80px] font-medium leading-tight"
                        delay={0}
                        speedReveal={2}
                        useInViewTrigger
                    >
                        {artist.name}
                    </TextEffect>

                    <TextEffect
                        per="word"
                        preset="slide"
                        as="p"
                        className="font-medium text-base leading-loose mb-6"
                        delay={0}
                        speedReveal={6}
                        useInViewTrigger
                    >
                        {artist.bio}
                    </TextEffect>

                    <div className="w-full flex flex-row items-center justify-between gap-6">
                        {artist.socials.map((social, index) => (
                            <div key={index} className="flex flex-col items-start gap-4">
                                <TextEffect
                                    per="char"
                                    preset="fade-in-blur"
                                    as="span"
                                    className="text-lg md:text-xl font-medium leading-tight"
                                    delay={0}
                                    speedReveal={2}
                                    useInViewTrigger
                                >
                                    {social.platform}
                                </TextEffect>
                                
                                <Link href={social.url} target="_blank" rel="noopener noreferrer">
                                    <TextEffect
                                        per="char"
                                        preset="fade-in-blur"
                                        as="span"
                                        className="text-secondary text-base md:text-lg font-medium"
                                        delay={0}
                                        speedReveal={2}
                                        useInViewTrigger
                                    >
                                        {social.username}
                                    </TextEffect>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full lg:w-[70%] flex flex-col gap-6 md:gap-12 py-16 md:py-48 px-4 md:px-8">
                <TextEffect
                    per="char"
                    preset="fade-in-blur"
                    as="h2"
                    className="text-3xl md:text-6xl lg:text-7xl font-medium mb-0 md:mb-6 leading-tight"
                    delay={0}
                    speedReveal={2}
                    useInViewTrigger
                >
                    Background
                </TextEffect>
                {Array.isArray(artist.background) ? (
                    artist.background.map((paragraph, index) => (
                        <TextEffect
                            key={index}
                            per="line"
                            preset="fade-in-blur"
                            as="p"
                            className="text-base mb-4 leading-loose"
                            delay={0.3}
                            speedReveal={0.2}
                            useInViewTrigger
                        >
                            {paragraph}
                        </TextEffect>
                    ))
                ) : (
                    <p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{artist.background}</p>
                )}
                {timelineData.length > 0 && (
                    <Timeline data={timelineData} />
                )}
            </section>

            {/* <section className="w-full hidden md:grid md:grid-cols-3 gap-4 md:gap-8 px-4 md:px-8">
                {artist.images && (
                    artist.images.slice(0, 3).map((image, index) => (
                        <Image
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            width={1920}
                            height={1080}
                            className="flex-1 w-full object-cover object-center rounded-lg aspect-[2/3]"
                            loading="lazy"
                        />
                    ))
                )}
            </section> */}
            <ImageGallery 
                images={artist.images}
                // containerHeight="h-[600px] sm:h-[900px] md:h-[600px]" 
				// imageSize="w-full lg:w-56 h-56 sm:h-[600px]"
                containerHeight="h-[700px] xs:h-[1000px] sm:h-[1200px] md:h-[280px] lg:h-[400px] xl:h-[600px] 2xl:h-[700px]" 
				imageSize="w-full md:w-56 h-56 xs:h-[450px] sm:h-[500px] md:h-[280px] lg:h-[400px] xl:h-[600px] 2xl:h-[700px]"
                // containerHeight="h-[900px] sm:h-[600px]" 
                // imageSize="w-full md:w-[500px] lg:w-[600px] xl:w-[1300px] h-56 sm:h-[600px]"
            />

            {/* <section className="w-full md:hidden">
                <Carousel
                    images={artist.images}
                    autoplayDelay={2000}
                    showPagination={true}
                    showNavigation={true}
                    />
            </section> */}
            
            {/* <section className='relative w-full px-4 block md:hidden pb-[5.5rem]'>
            </section> */}

        </div>
    );
}
 
export default Artist;