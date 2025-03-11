"use client";

import Image from "next/image";
import artists from "@/data/artists.json";
import { notFound, useParams } from "next/navigation";


const Artist = () => {

    const params = useParams();

    const artist = artists.find((a) => a.id === params.id);

    if (!artist) {
        return notFound();
    }

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-2">
                <div className="flex">
                    <Image
                        src={artist.image}
                        alt={`${artist.name} portrait`}
                        width={1920}
                        height={1080}
                        className="h-screen flex-1 w-full object-cover object-center"
                    />
                </div>
                <div className="pt-18 px-8 flex flex-col gap-4 items-start justify-center">
                    <h1 className="text-4xl text-white font-medium [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{artist.name}</h1>
                    <p className="text-2xl text-zinc-400 font-normal [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{artist.bio}</p>
                </div>
            </div>
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