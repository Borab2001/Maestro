"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";

import artists from "@/data/artists.json";

import { Timeline } from "@/components/ui/timeline";
import { TextEffect } from "@/components/ui/text-effect";


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
        <div className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative w-full aspect-[3/4] sm:aspect-[5/4] md:aspect-auto md:h-[calc(100vh-104px)]">
                    <Image
                        src={artist.portrait}
                        alt={`${artist.name} portrait`}
                        fill
                        className="rounded-lg object-cover object-center"
                        priority
                    />
                </div>
                <div className="pt-18 flex flex-col gap-10 md:gap-24 items-start justify-end">
                    <TextEffect
                        per="char"
                        preset="fade-in-blur"
                        as="h1"
                        className="text-3xl md:text-6xl xl:text-[80px] font-medium leading-tight"
                        delay={2.25}
                        speedReveal={2}
                    >
                        {artist.name}
                    </TextEffect>

                    <TextEffect
                        per="char"
                        preset="fade-in-blur"
                        as="p"
                        className="font-medium text-base leading-loose mb-6"
                        delay={2.5}
                        speedReveal={6}
                    >
                        {artist.bio}
                    </TextEffect>

                    <div className="w-full flex flex-row items-center justify-between gap-8">
                        {artist.socials.map((social, index) => (
                            <div key={index} className="flex flex-col items-start gap-4">
                                <span className="text-lg md:text-xl font-medium capitalize leading-tight [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{social.platform}</span>
                                <Link href={social.url} target="_blank" rel="noopener noreferrer" className="text-secondary text-base md:text-lg font-medium">
                                    {social.username}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full md:w-[70%] py-24 md:py-48 flex flex-col gap-8 md:gap-12">
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">Background</h2>
                {Array.isArray(artist.background) ? (
                    artist.background.map((paragraph, index) => (
                        <p key={index} className="text-base mb-4 leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{paragraph}</p>
                    ))
                ) : (
                    <p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{artist.background}</p>
                )}
                {timelineData.length > 0 && (
                    <Timeline data={timelineData} />
                )}
            </section>

            <section className="w-full hidden md:grid md:grid-cols-3 gap-4 md:gap-8">
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
            </section>

            {/* <section className='relative w-full px-4 block md:hidden pb-[5.5rem]'>
            </section> */}
        </div>
    );
}
 
export default Artist;