"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import artists from "@/data/artists.json";

import { Timeline } from "@/components/ui/timeline";

gsap.registerPlugin(SplitType, ScrollTrigger);

const Artist = () => {

    const container = useRef(null);

    useGSAP(() => {
		const title = new SplitType("h1", { types: "chars" });
		const subtitle = new SplitType("h2", { types: "chars" });
		const text = new SplitType("p", { types: "lines", tagName: "div", lineClass: "line" });

		if (title.chars) {
			title.chars.forEach((char) => {
				const content = char.innerHTML;
				char.innerHTML = `<span className="relative will-change-transform">${content}</span>`;
			});

			gsap.set(title.chars, { 
				y: 100 
			});
			gsap.to(title.chars, { 
				y: 0, 
				duration: 0.75, 
                stagger: 0.075, 
                ease: "power4.out", 
                delay: 0.25 
            });
		}

		if (subtitle.chars) {
			subtitle.chars.forEach((char) => {
				const content = char.innerHTML;
				char.innerHTML = `<span className="relative will-change-transform">${content}</span>`;
			});
			
			gsap.set(subtitle.chars, { 
				y: 100,
			});

			document.querySelectorAll("h2").forEach(subtitle => {
				const chars = subtitle.querySelectorAll(".char");
				
				gsap.to(chars, { 
					y: 0, 
					duration: 1, 
					stagger: 0.075, 
					ease: "power4.out",
					scrollTrigger: {
						trigger: subtitle,
						start: "top 80%"
					}
				});
			});
		}


		if (text.lines) {
			text.lines.forEach((line) => {
				const content = line.innerHTML;
				line.innerHTML = `<span className="relative will-change-transform">${content}</span>`;
			});

			gsap.set(".line span", { 
				y: 100,
                display: "block" 
			});
			
			document.querySelectorAll("p").forEach(paragraph => {
				const lines = paragraph.querySelectorAll(".line span");
                
				gsap.to(lines, { 
                    y: 0, 
                    duration: 1.5, 
                    stagger: 0.075, 
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: paragraph,
                        start: "top 80%",    // Animation commence quand le haut du paragraphe atteint 80% de la hauteur de la fenêtre
                    }
                });
            });
		}

        // Animation des statistiques
        // gsap.from(".grid > div", {
        //     y: 30,
        //     duration: 0.8,
        //     stagger: 0.2,
        //     scrollTrigger: {
        //         trigger: ".grid",
        //         start: "top 80%"
        //     }
        // });

        return () => {
            if (title) title.revert();
			if (subtitle) subtitle.revert();
            if (text) text.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, { scope: container });

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
                    <h1 className="text-3xl md:text-6xl xl:text-[80px] font-medium leading-tight [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
                        {artist.name} {artist.surname}
                    </h1>
                    <p className="font-medium text-base leading-loose mb-6 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
                        {artist.bio}
					</p>
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

            <div className="w-full md:w-[70%] py-48 flex flex-col gap-4 md:gap-8">
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
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {artist.images && (
                    artist.images.slice(0, 3).map((image, index) => (
                        <Image
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            width={1920}
                            height={1080}
                            className="flex-1 w-full object-cover object-center rounded-lg"
                            loading="lazy"
                        />
                    ))
                )}
            </div>
        </div>

    );
}
 
export default Artist;