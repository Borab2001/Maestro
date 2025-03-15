"use client";

import Image from "next/image";
import artists from "@/data/artists.json";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";


const Artist = () => {

    const params = useParams();

    const artist = artists.find((a) => a.id === params.id);

    if (!artist) {
        return notFound();
    }

    return (
        <div className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex">
                    <Image
                        src={artist.image}
                        alt={`${artist.name} portrait`}
                        width={1920}
                        height={1080}
                        className="w-full h-[calc(100vh-104px)] flex-1 rounded-lg object-cover object-center"
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

            <div className="w-[70%] pt-48 px-4 sm:px-8 md:px-20 flex flex-col gap-4">
                <h2 className="text-3xl font-medium">Artist Background</h2>
                <p className="text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus, harum dolorem tempore, eius aperiam recusandae voluptate omnis dolorum soluta provident voluptatibus error dignissimos saepe sequi similique ea voluptas nam?</p>
            </div>
            <div className="w-full p-4 sm:p-8 md:p-20 grid grid-cols-3 gap-4">
                <Image
                    src={artist.image}
                    alt={`${artist.name} image 1`}
                    width={1920}
                    height={1080}
                    className="flex-1 w-full object-cover object-center"
                />
                <Image
                    src={artist.image}
                    alt={`${artist.name} image 2`}
                    width={1920}
                    height={1080}
                    className="flex-1 w-full object-cover object-center"
                />
                <Image
                    src={artist.image}
                    alt={`${artist.name} image 3`}
                    width={1920}
                    height={1080}
                    className="flex-1 w-full object-cover object-center"
                />
            </div>
        </div>

    );
}
 
export default Artist;