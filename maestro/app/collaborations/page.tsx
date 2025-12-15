"use client";

import ImageReveal from "@/components/ui/image-reveal";
import { TextEffect } from "@/components/ui/text-effect";
import collaborationsData from "@/data/collaborations.json";


const Collaborations = () => {

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
                        {collaborationsData.hero.title}
                    </TextEffect>
                </div>
            </section>
            <section className="flex flex-col w-full gap-16">
                {collaborationsData.collabs.slice().map((collab) => (
                    <div key={collab.name}>
                        <div 
                            className="flex flex-col" 
                        >
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
                                    {collab.name}
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
                                    {collab.date}
                                </TextEffect>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                                <div className="col-span-1 pt-4 md:pt-8 lg:pt-[58px] flex flex-col gap-4 md:gap-8">
                                    <ImageReveal
                                        src={collab.image.src}
                                        alt={collab.image.alt}
                                        className="aspect-[3/2] lg:aspect-[16/14] object-cover w-full"
                                        animationType="clip-path"
                                        duration={1.2}
                                        delay={0.3}
                                        ease={"easeInOut"}
                                    />
                                    {(Array.isArray(collab.paragraphs) ? collab.paragraphs : [collab.paragraphs]).map((paragraph, index) => (
                                        <TextEffect
                                            key={index}
                                            per="line"
                                            preset="fade-in-blur"
                                            as="p"
                                            className=""
                                            delay={0.3}
                                            speedReveal={1.2}
                                            useInViewTrigger
                                        >
                                            {paragraph}
                                        </TextEffect>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
 
export default Collaborations;