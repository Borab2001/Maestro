"use client";

import { TextEffect } from "@/components/ui/text-effect";
import AlbumSection from "@/components/ui/album-section";


const Album = () => {

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
                        L&apos;Album
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
            
            <AlbumSection />
        </div>
    );
}
 
export default Album;