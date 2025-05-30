"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    year: string;
    title: string;
    description: string;
    // content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div ref={containerRef}>
            <div ref={ref} className="relative max-w-7xl mx-auto py-20 my-12">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-start top-40 self-start w-full">
                            <div className="w-10 md:w-12 h-10 md:h-12 absolute rounded-full bg-background flex items-center justify-center">
                                <div className="h-8 w-8 rounded-full bg-transparent border-3 border-neutral-300 p-2" />
                            </div>
                            <div className="flex flex-col gap-4 md:gap-8 w-full pl-14 md:pl-20">
                                <h3 className="w-full text-3xl md:text-5xl font-medium">
                                    {item.year}
                                </h3>
                                <div className="flex flex-col gap-2 md:gap-4">
                                    <span className="w-full text-xl md:text-3xl">
                                        {item.title}
                                    </span>
                                    <p className="w-full text-base text-secondary md:text-xl">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}

                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute left-[18px] md:left-[22px] top-0 bg-white/10 overflow-hidden w-1 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-1 bg-gradient-to-t from-white via-amber-400 to-transparent from-[0%] via-[30%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
