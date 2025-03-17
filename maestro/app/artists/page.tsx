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
        <main className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="py-6 md:py-12">
                <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium">Les Artistes</h1>
            </section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {artists.map((artist) => (
                    <Link 
                        className='group relative w-full aspect-[3/5] overflow-hidden rounded-lg'
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
                            src={artist.portrait}
                            alt={`${artist.name} portrait`}
                            fill
                            className="group-hover:grayscale-100 w-full aspect-[3/5] object-center object-cover transition-all duration-300 ease-in-out"
                        />
                        <ProgressiveBlur
                            className='pointer-events-none absolute bottom-[-1px] left-0 h-[20%] w-full'
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
        </main>
    );
}
 
export default Artists;