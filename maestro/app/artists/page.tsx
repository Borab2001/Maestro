"use client";

// import { Metadata } from "next";
import Link from "next/link";
// import Image from "next/image";

import artists from "@/data/artists.json";

import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";
// import { ProgressiveBlur } from "@/components/ui/progressive-blur";
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
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                {artists.map((artist, index) => (
                    // <Link 
                    //     className='group relative w-full aspect-[3/4] md:aspect-[3/4] lg:aspect-[2/3] overflow-hidden rounded-md'
                    //     key={artist.id}
                    //     href={`/artists/${artist.id}`}
                    //     onClick={(e) => {
                    //         e.preventDefault();
                    //         router.push(`artists/${artist.id}`, {
                    //             onTransitionReady: slideInOut
                    //         });
                    //     }}
                    // >
                    //     <ImageReveal
                    //         src={artist.portrait}
                    //         alt={`${artist.name} portrait`}
                    //         className="group-hover:grayscale-100 w-full aspect-[2/3] object-center object-cover transition-all duration-300 ease-in-out"
                    //         duration={1.8}
                    //         delay={index * 0.1}
                    //         animationType="clip-path"
                    //     />
                    //     <ProgressiveBlur
                    //         className='pointer-events-none absolute bottom-[-1px] left-0 h-[20%] w-full'
                    //         blurIntensity={6}
                    //     />
                    //     <div className='absolute bottom-0 left-0'>
                    //         <div className='flex flex-col items-start gap-0 p-4'>
                    //             <TextEffect
                    //                 per="char"
                    //                 preset="fade-in-blur"
                    //                 as="h2"
                    //                 className="text-2xl font-medium text-white leading-tight"
                    //                 delay={0.3}
                    //                 speedReveal={2}
                    //                 useInViewTrigger
                    //             >
                    //                 {artist.name}
                    //             </TextEffect>
                    //             <TextEffect
                    //                 per="line"
                    //                 preset="fade-in-blur"
                    //                 as="span"
                    //                 className="text-base font-medium text-zinc-400 capitalize leading-loose"
                    //                 delay={0.3}
                    //                 speedReveal={0.2}
                    //                 useInViewTrigger
                    //             >
                    //                 {artist.role}
                    //             </TextEffect>
                    //         </div>
                    //     </div>
                    // </Link>
                    <Link 
                        className='group flex flex-col items-start'
                        key={artist.id}
                        href={`/artists/${artist.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`artists/${artist.id}`, {
                                onTransitionReady: slideInOut
                            });
                        }}
                    >
                        <ImageReveal
                            src={artist.portrait}
                            alt={`${artist.name} portrait`}
                            className="group-hover:grayscale-100 rounded-lg w-full aspect-[5/6] md:aspect-[3/4] overflow-hidden transition-all duration-300 ease-in-out"
                            duration={1.8}
                            delay={index * 0.1}
                            animationType="clip-path"
                        />
                        <div className='flex flex-col items-start gap-0 py-4'>
                            <TextEffect
                                per="char"
                                preset="fade-in-blur"
                                as="h2"
                                className="text-2xl font-medium text-white leading-tight"
                                delay={0.3}
                                speedReveal={2}
                                useInViewTrigger
                            >
                                {artist.name}
                            </TextEffect>
                            {/* <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                as="span"
                                className="italic text-base font-medium text-zinc-400 capitalize leading-loose"
                                delay={0.3}
                                speedReveal={0.2}
                                useInViewTrigger
                            >
                                {artist.role}
                            </TextEffect> */}
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
 
export default Artists;