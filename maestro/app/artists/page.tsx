"use client";

import Link from "next/link";
import Image from "next/image";

import artists from "@/data/artists.json";

import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";


const Artists = () => {

    const router = useTransitionRouter();

    return (
        <div className="min-h-screen pt-48 px-8 md:px-16 xl:px-24">
            <h1 className="text-3xl font-medium mb-4">The Artists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8 md:gap-16 xl:gap-24 2xl:gap-24">
                {artists.map((artist) => (
                    // <Link 
                    //     key={artist.id} 
                    //     href={`/artists/${artist.id}`} 
                    //     className="group"
                    //     onClick={(e) => {
                    //         e.preventDefault();
                    //         router.push(`artists/${artist.id}`, {
                    //             onTransitionReady: slideInOut
                    //         });
                    //     }}
                    // >
                    //     <div className="flex flex-col gap-4 border p-4 rounded-lg">
                    //         <Image
                    //             src={artist.image}
                    //             alt={artist.name}
                    //             width={300}
                    //             height={200}
                    //             className="w-full aspect-[12/16] object-cover rounded-md"
                    //         />
                    //         <div className="flex flex-col gap-2">
                    //             <h2 className="text-2xl font-medium text-white">{artist.name}</h2>
                    //             <p className="text-lg font-medium text-zinc-400 capitalize">{artist.role}</p>
                    //         </div>
                    //     </div>
                    // </Link>

                    <Link 
                        className='group relative w-full aspect-[3/5] overflow-hidden rounded-xl'
                        key={artist.id}
                        href={`/artists/${artist.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`artists/${artist.id}`, {
                                onTransitionReady: slideInOut
                            });
                        }}
                    >
                        <Image
                            src={artist.image}
                            alt={`${artist.name} portrait`}
                            width={300}
                            height={500}
                            className="group-hover:grayscale-100 w-full aspect-[3/5] object-center object-cover transition-all duration-300 ease-in-out"
                        />
                        <ProgressiveBlur
                            className='pointer-events-none absolute bottom-0 left-0 h-[20%] w-full'
                            blurIntensity={6}
                        />
                        <div className='absolute bottom-0 left-0'>
                            <div className='flex flex-col items-start gap-0 p-4'>
                                <h2 className='text-2xl font-medium text-white capitalize'>{artist.name}</h2>
                                <span className='text-base font-medium text-zinc-400 capitalize'>{artist.role}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
 
export default Artists;