"use client";

import Image from "next/image";
import artists from "@/data/artists.json";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";


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
        // content: (
        //     <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
        //         <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
        //         <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
        //     </div>
        // ),
    })) || [];

    return (
        <div className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative w-full h-[calc(100vh-104px)]">
                    <Image
                        src={artist.portrait}
                        alt={`${artist.name} portrait`}
                        fill
                        className="rounded-lg object-cover object-center"
                        priority
                    />
                </div>
                <div className="pt-18 flex flex-col gap-24 items-start justify-end">
                    <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
                        {artist.name}
                    </h1>
                    <p className="font-medium text-base leading-loose mb-6 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
                        {artist.bio}
					</p>
                    <div className="w-full flex flex-row items-center justify-between gap-8">
                        {artist.socials.map((social, index) => (
                            <div key={index} className="flex flex-col items-start gap-4">
                                <span className="text-lg md:text-xl font-medium capitalize">{social.platform}</span>
                                <Link href={social.url} target="_blank" rel="noopener noreferrer" className="text-secondary text-base md:text-lg font-medium">
                                    {social.username}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="w-full md:w-[70%] py-48 flex flex-col gap-4 md:gap-8">
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6">Background</h2>
                {Array.isArray(artist.background) ? (
                    artist.background.map((paragraph, index) => (
                        <p key={index} className="text-lg mb-4">{paragraph}</p>
                    ))
                ) : (
                    <p className="text-lg">{artist.background}</p>
                )}
                {timelineData.length > 0 && (
                    <Timeline data={timelineData} />
                )}
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <Image
                    src={artist.portrait}
                    alt={`${artist.name} image 1`}
                    width={1920}
                    height={1080}
                    className="flex-1 w-full object-cover object-center rounded-lg"
                    loading="lazy"
                />
                <Image
                    src={artist.portrait}
                    alt={`${artist.name} image 2`}
                    width={1920}
                    height={1080}
                    className="flex-1 w-full object-cover object-center rounded-lg"
                    loading="lazy"
                />
                <Image
                    src={artist.portrait}
                    alt={`${artist.name} image 3`}
                    width={1920}
                    height={1080}
                    className="flex-1 w-full object-cover object-center rounded-lg"
                    loading="lazy"
                />
            </div>
        </div>

    );
}
 
export default Artist;