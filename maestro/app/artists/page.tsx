"use client";

// import { Metadata } from "next";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import artists from "@/data/artists.json";

import { TextEffect } from "@/components/ui/text-effect";
import ImageReveal from "@/components/ui/image-reveal";

// export const metadata: Metadata = {
//     title: 'Artists - Maestro',
//     description: 'Découvrez les artistes talentueux de la troupe Maestro, la première troupe de pianistes de France. Plongez dans leurs parcours, leurs styles uniques et leur passion pour la musique.',
//     keywords:
// 		"maestro, pianiste, musique, artiste, gare, piano, concert, tiktok, instagram",
// 	openGraph: {
// 		title: "Les artistes de Maestro",
// 		description:
// 			"Maestro est la première troupe de pianistes de France, réunissant des artistes talentueux venants des gares et des réseaux sociaux pour offrir des performances musicales inoubliables.",
// 		url: "https://www.maestroconcerts.com",
// 		siteName: "Maestro Concerts",
// 		locale: "fr_FR",
// 		type: "website",
// 		images: [
// 			{
// 			url: "https://www.maestroconcerts.com/og-image.jpg",
// 			width: 1200,
// 			height: 630,
// 			alt: "Maestro Concerts Preview",
// 			},
// 		],
// 	},
// };

const Artists = () => {

    const router = useTransitionRouter();
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1280) setColumns(4); // xl
            else if (width >= 1024) setColumns(3); // lg
            else if (width >= 475) setColumns(2); // xs
            else setColumns(1); // mobile
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const getDelay = (index: number) => {
        const positionInRow = index % columns;
        return positionInRow * 0.1;
    };

    return (
        <main className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="py-6 md:py-12 lg:pt-24">
                <TextEffect
                    per="char"
                    preset="fade-in-blur"
                    as="h1"
                    className="text-3xl xs:text-5xl md:text-6xl lg:text-8xl font-medium leading-tight"
                    delay={0.3}
                    speedReveal={1.2}
                    useInViewTrigger
                >
                    Les Artistes
                </TextEffect>
            </section>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8" style={{ contain: "layout style paint" }}>
                {artists.map((artist, index) => (
                    <Link 
                        className='relative group flex flex-col items-start rounded-lg overflow-hidden'
                        key={artist.id}
                        href={`/artists/${artist.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`artists/${artist.id}`, {
                                onTransitionReady: slideInOut
                            });
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.6 + getDelay(index),
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            viewport={{ once: true, margin: "50px 0px" }}
                            className='relative w-full'
                        >
                            <ImageReveal
                                src={artist.portrait}
                                alt={`${artist.name} portrait`}
                                className="grayscale-100 group-hover:grayscale-0 rounded-lg w-full aspect-[5/6] md:aspect-[3/4] overflow-hidden transition-all duration-300 ease-in-out"
                                duration={0.8}
                                delay={0}
                                animationType="none"
                            />
                            <div className='pointer-events-none absolute bottom-0 left-0 h-[30%] w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
                            <div className='absolute bottom-0 right-0 left-0 flex flex-col items-start gap-1 p-4'>
                                <h2 className="text-2xl font-medium text-white leading-tight">
                                    {artist.name}
                                </h2>
                                <span className="italic text-sm font-medium text-zinc-300 leading-loose">
                                    {artist.socials[0].username}
                                </span>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
 
export default Artists;