"use client";

import { useRef, useEffect } from "react";
import projects from "@/data/projects.json";

import { TextEffect } from "@/components/ui/text-effect";
import ImageReveal from "@/components/ui/image-reveal";
import AnimatedLine from "@/components/ui/animated-line";


const Concerts = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="py-6 md:py-12 lg:pt-24">
                <div className="w-full md:w-[70%] max-w-5xl flex flex-col gap-4 md:gap-8">
                    <TextEffect
                        per="char"
                        preset="fade-in-blur"
                        as="h1"
                        className="text-3xl xs:text-5xl md:text-6xl lg:text-8xl font-medium leading-tight"
                        delay={0}
                        speedReveal={1.2}
                        useInViewTrigger
                    >
                        Les Concerts
                    </TextEffect>
                    {/* <TextEffect
						per="word"
						preset="slide"
						as="p"
						className="font-medium text-base leading-loose mb-6"
						delay={0.6}
						speedReveal={6}
						useInViewTrigger
					>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus, harum dolorem tempore, eius aperiam recusandae voluptate omnis dolorum soluta provident voluptatibus error dignissimos saepe sequi similique ea voluptas nam?
					</TextEffect> */}
                </div>
            </section>
            
            <section className="flex flex-col w-full gap-16">
                {projects.slice().map((project) => (
                    <div key={project.name}>
                        <div 
                            className="flex flex-col" 
                        >
                            {/* <div className={`col-span-1 lg:col-span-2 py-6 flex flex-col ${project.id % 2 === 0 ? 'lg:order-first' : 'lg:order-last'}`}> */}
                            <div className="flex flex-col gap-4">
                                <TextEffect
                                    per="char"
                                    preset="fade-in-blur"
                                    as="h2"
                                    className="text-xl md:text-3xl xl:text-5xl font-medium leading-tight"
                                    delay={0.3}
                                    speedReveal={2}
                                    useInViewTrigger
                                >
                                    {project.name}
                                </TextEffect>

                                <TextEffect
                                    per="char"
                                    preset="fade-in-blur"
                                    as="span"
                                    className="text-secondary font-medium text-base md:text-xl"
                                    delay={0.3}
                                    speedReveal={2}
                                    useInViewTrigger
                                >
                                    {project.date}
                                </TextEffect>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                                <div className="col-span-1 pt-4 md:pt-8 lg:pt-[58px] flex flex-col gap-4 md:gap-8">
                                    <ImageReveal
                                        src={project.image}
                                        alt={project.alt}
                                        className="aspect-[3/2] lg:aspect-[16/14] object-cover w-full"
                                        animationType="clip-path"
                                        duration={1.2}
                                        delay={0.3}
                                        ease={"easeInOut"}
                                    />
                                    <TextEffect
                                        per="line"
                                        preset="fade-in-blur"
                                        as="p"
                                        className=""
                                        delay={0.3}
                                        speedReveal={1.2}
                                        useInViewTrigger
                                    >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quis dolores quo perferendis quod repellat tenetur perspiciatis excepturi itaque, deserunt cumque, cum labore nulla doloribus dicta! Quidem assumenda hic tempore!
                                    </TextEffect>
                                </div>

                                <div className="col-span-1 lg:col-span-2 flex flex-col gap-0">
                                    <div className="w-full flex flex-row items-center text-secondary">
                                        <div className="w-full h-[58px] flex items-center">
                                            <TextEffect
                                                per="word"
                                                preset="slide"
                                                as="p"
                                                className=""
                                                delay={0.6}
                                                speedReveal={2}
                                                useInViewTrigger
                                            >
                                                Morceau
                                            </TextEffect>
                                        </div>
                                        <div className="w-full h-[58px] flex items-center">
                                            <TextEffect
                                                per="word"
                                                preset="slide"
                                                as="p"
                                                className=""
                                                delay={0.6}
                                                speedReveal={2}
                                                useInViewTrigger
                                            >
                                                Artistes
                                            </TextEffect>
                                        </div>
                                    </div>
                                    <AnimatedLine delay={0.2} />

                                    {project.tracklist?.map((tracklist, index) => (
                                        <div key={tracklist.id}>
                                            <div className="w-full flex flex-row items-center">
                                                <div className="w-full min-h-[58px] flex items-center">
                                                    <TextEffect
                                                        per="word"
                                                        preset="slide"
                                                        as="p"
                                                        className=""
                                                        delay={0.6}
                                                        speedReveal={2}
                                                        useInViewTrigger
                                                    >
                                                        {tracklist.name}
                                                    </TextEffect>
                                                </div>
                                                <div className="w-full min-h-[58px] flex items-center">
                                                    <TextEffect
                                                        per="word"
                                                        preset="slide"
                                                        as="p"
                                                        className=""
                                                        delay={0.6}
                                                        speedReveal={2}
                                                        useInViewTrigger
                                                    >
                                                        {tracklist.artists}
                                                    </TextEffect>
                                                </div>
                                            </div>
                                            <AnimatedLine delay={index * 0.03} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            
            <section className="py-8 md:py-16">
                <video 
                    ref={videoRef}
                    className="w-full aspect-video rounded-lg"
                    loop
                    playsInline
                    preload="metadata"
                >
                    <source src="/videos/concert1.webm" type="video/webm" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            </section>
        </div>
    );
}
 
export default Concerts;