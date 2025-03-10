"use client";

import Link from "next/link";
import Image from "next/image";

import artists from "@/data/artists.json";

import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";


const ArtistsPage = () => {

    const router = useTransitionRouter();

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-5">Our Artists</h1>
            <div className="grid grid-cols-3 gap-5">
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
                        <div className="border p-5 rounded-lg shadow hover:shadow-lg transition">
                        <Image
                            src={artist.image}
                            alt={artist.name}
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-xl mt-3 group-hover:underline">{artist.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
 
export default ArtistsPage;