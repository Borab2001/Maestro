"use client";

import Link from "next/link";
import Image from "next/image";

import artists from "@/data/artists.json";

import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";


const ArtistsPage = () => {

    const router = useTransitionRouter();

    return (
        <div className="pt-48 px-4 sm:px-8 md:px-20">
            <h1 className="text-3xl font-medium mb-4">The Artists</h1>
            <div className="grid grid-cols-4 gap-4">
                {artists.map((artist) => (
                    <Link 
                        key={artist.id} 
                        href={`/artists/${artist.id}`} 
                        className="group"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`artists/${artist.id}`, {
                                onTransitionReady: slideInOut
                            });
                        }}
                    >
                        <div className="flex flex-col gap-4 border p-4 rounded-lg">
                            <Image
                                src={artist.image}
                                alt={artist.name}
                                width={300}
                                height={200}
                                className="w-full aspect-[9/16] object-cover rounded-md"
                            />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-medium text-white">{artist.name}</h2>
                                <p className="text-lg font-medium text-zinc-400 capitalize">{artist.role}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
 
export default ArtistsPage;