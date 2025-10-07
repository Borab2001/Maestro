import concerts from "@/data/concerts.json";

import { TextEffect } from "@/components/ui/text-effect";
import AlbumSection from "@/components/ui/album-section";
import ImageReveal from "@/components/ui/image-reveal";

const Concerts = () => {
    return (
        <div className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="py-6 md:py-12">
                <div className="w-full md:w-[70%] max-w-5xl flex flex-col gap-4 md:gap-8">
                    <TextEffect
                        per="char"
                        preset="fade-in-blur"
                        as="h1"
                        className="text-3xl md:text-6xl xl:text-[80px] font-medium leading-tight"
                        delay={0}
                        speedReveal={1.2}
                        useInViewTrigger
                    >
                        Les Concerts
                    </TextEffect>
                    <TextEffect
						per="word"
						preset="slide"
						as="p"
						className="font-medium text-base leading-loose mb-6"
						delay={0.6}
						speedReveal={6}
						useInViewTrigger
					>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus, harum dolorem tempore, eius aperiam recusandae voluptate omnis dolorum soluta provident voluptatibus error dignissimos saepe sequi similique ea voluptas nam?
					</TextEffect>
                </div>
            </section>
            
            {concerts.slice().reverse().map((concert) => (
                <section className="py-16" key={concert.name}>
                    <div 
                        className="grid grid-cols-1 lg:grid-cols-5 gap-8" 
                    >
                        <div className={`col-span-1 lg:col-span-2 py-6 flex flex-col ${concert.id % 2 === 0 ? 'lg:order-first' : 'lg:order-last'}`}>
                            <TextEffect
                                per="char"
                                preset="fade-in-blur"
                                as="h2"
                                className="text-xl md:text-3xl xl:text-6xl font-medium mb-0 md:mb-6 leading-tight"
                                delay={0.3}
                                speedReveal={2}
                                useInViewTrigger
                            >
                                {concert.name}
                            </TextEffect>

                            <TextEffect
                                per="char"
                                preset="fade-in-blur"
                                as="span"
                                className="text-secondary font-medium text-lg md:text-2xl mb-6"
                                delay={0.3}
                                speedReveal={2}
                                useInViewTrigger
                            >
                                {concert.date}
                            </TextEffect>

                            <TextEffect
                                per="word"
                                preset="slide"
                                as="p"
                                className="font-medium text-base leading-loose"
                                delay={0.3}
                                speedReveal={6}
                                useInViewTrigger
                            >
                                {concert.description}
                            </TextEffect>

                            <div className="hidden lg:block space-y-2 mt-6">
                                {concert.tracklist?.map((tracklist) => (
                                    <div 
                                        className="py-2" 
                                        key={tracklist.id}
                                    >
                                        <TextEffect
                                            per="word"
                                            preset="slide"
                                            as="span"
                                            className="font-medium text-base leading-loose"
                                            delay={0.3}
                                            speedReveal={6}
                                            useInViewTrigger
                                        >
                                            {`${tracklist.name} - `}
                                        </TextEffect>
                                         <TextEffect
                                            per="word"
                                            preset="slide"
                                            as="span"
                                            className="text-neutral-400 font-medium text-base leading-loose"
                                            delay={0.3}
                                            speedReveal={6}
                                            useInViewTrigger
                                        >
                                            {tracklist.artists}
                                        </TextEffect>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-3">
                            <div className="sticky top-1/6 self-start">
                                <ImageReveal
                                    src={concert.image}
                                    alt={concert.alt}
                                    className="aspect-[16/12] object-cover w-full"
                                    duration={1.8}
                                    delay={0}
                                    ease=""
                                />
                            </div>
                        </div>
                        <div className="lg:hidden space-y-2">
                            {concert.tracklist?.map((tracklist) => (
                                <div 
                                    className="py-2" 
                                    key={tracklist.id}
                                >
                                    <TextEffect
                                        per="word"
                                        preset="slide"
                                        as="span"
                                        className="font-medium text-base leading-loose"
                                        delay={0.3}
                                        speedReveal={6}
                                        useInViewTrigger
                                    >
                                        {`${tracklist.name} - `}
                                    </TextEffect>
                                    <TextEffect
                                        per="word"
                                        preset="slide"
                                        as="span"
                                        className="text-neutral-400 font-medium text-base leading-loose"
                                        delay={0.3}
                                        speedReveal={6}
                                        useInViewTrigger
                                    >
                                        {tracklist.artists}
                                    </TextEffect>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
            <AlbumSection />
        </div>
    );
}
 
export default Concerts;