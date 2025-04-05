/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import { cn } from "@/lib/utils";

interface PianoKey {
    id: number;
    width: number;
    isBlack: boolean;
    order: number;
    left: number;
}

interface PianoTilesProps {
    whiteKeyClassName?: string;
    blackKeyClassName?: string;
    animationDuration?: number;
    animationDelay?: number;
    stagger?: number;
    children?: React.ReactNode;
}

export default function PianoTiles({
    whiteKeyClassName,
    blackKeyClassName,
    animationDuration = 0.5,
    animationDelay = 1,
    stagger = 0.05,
    children,
}: PianoTilesProps) {
    const [keys, setKeys] = useState<PianoKey[]>([]);
    const [animationComplete, setAnimationComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    const calculateKeys = useCallback(() => {
        if (containerRef.current) {
            const { offsetWidth: containerWidth } = containerRef.current;

            // Define the pattern of white keys (0) and black keys (1)
            // One octave consists of: W B W B W W B W B W B W (7 white keys, 5 black keys)
            const keyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

            // Calculate how many octaves we can fit in the container
            const baseWhiteKeyWidth = 40;
            const whiteKeysPerOctave = 7;
            const octaves = Math.max(
                1,
                Math.floor(containerWidth / (baseWhiteKeyWidth * whiteKeysPerOctave))
            );

            // Adjust white key width to fill the container
            const whiteKeyWidth = containerWidth / (octaves * whiteKeysPerOctave);
            const blackKeyWidth = whiteKeyWidth * 0.6; // Black keys are typically narrower

            // Generate the keys
            const newKeys: PianoKey[] = [];
            let whiteKeyCount = 0;

            for (let octave = 0; octave < octaves; octave++) {
                for (let i = 0; i < keyPattern.length; i++) {
                    const isBlack = keyPattern[i] === 1;

                    if (!isBlack) {
                        // For white keys
                        newKeys.push({
                            id: newKeys.length,
                            width: whiteKeyWidth,
                            isBlack: false,
                            order: 0, // We'll calculate this after generating all keys
                            left: whiteKeyCount * whiteKeyWidth,
                        });
                        whiteKeyCount++;
                    } else {
                        // For black keys
                        newKeys.push({
                            id: newKeys.length,
                            width: blackKeyWidth,
                            isBlack: true,
                            order: 0, // We'll calculate this after generating all keys
                            // Black keys should overlap white keys
                            left: whiteKeyCount * whiteKeyWidth - blackKeyWidth / 2,
                        });
                    }
                }
            }

            // Calculate the center index
            const centerIndex = Math.floor(newKeys.length / 2);

            // Assign orders based on distance from center
            newKeys.forEach((key, index) => {
                key.order = Math.abs(index - centerIndex);
            });

            setKeys(newKeys);
        }
    }, []);

    // Calculate the total animation duration
    const calculateTotalAnimationDuration = useCallback(() => {
        if (keys.length === 0) return 0;

        // Find the key with the highest order
        const maxOrder = Math.max(...keys.map((key) => key.order));

        // Total duration = initial delay + animation duration + (stagger per key * max order)
        return animationDelay + animationDuration + maxOrder * stagger;
    }, [keys, animationDelay, animationDuration, stagger]);

    useEffect(() => {
        calculateKeys();
        const resizeObserver = new ResizeObserver(calculateKeys);
        if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, [calculateKeys]);

    // Disable scrolling during animation
    useEffect(() => {
        if (isInView && !animationComplete) {
        // Disable scrolling
        document.body.style.overflow = "hidden";

        // Set a timer to re-enable scrolling once the animation is complete
        const totalDuration = calculateTotalAnimationDuration();
        const timer = setTimeout(() => {
            document.body.style.overflow = "";
            setAnimationComplete(true);
        }, totalDuration * 1000); // Convert to milliseconds

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
        }
    }, [isInView, animationComplete, calculateTotalAnimationDuration]);

    // Sort keys so white keys are rendered first, black keys on top
    const sortedKeys = [...keys].sort((a, b) => (a.isBlack ? 1 : -1));

    return (
        <div ref={containerRef} className={`${animationComplete ? "h-auto overflow-auto" : "relative h-screen overflow-hidden"}`}>
            {children}

            <div className={`${animationComplete ? "hidden" : "absolute inset-0"}`}>
                {sortedKeys.map((key) => (
                    <motion.div
                        key={key.id}
                        className={cn(
                            key.isBlack
                                ? "z-100" +
                                (blackKeyClassName ? ` ${blackKeyClassName}` : "")
                                : "z-100 bg-gradient-to-b from-zinc-50 to-zinc-200 border-x border-gray-200" +
                                (whiteKeyClassName ? ` ${whiteKeyClassName}` : "")
                        )}
                        style={{
                            width: key.width,
                            position: "absolute",
                            left: key.left,
                            top: 0,
                            height: "100%", // Make all keys full height for animation
                            clipPath: key.isBlack
                                ? "polygon(0 0, 100% 0, 100% 60%, 0 60%)"
                                : undefined, // Clip black keys visually
                            borderRadius: key.isBlack ? "0 0 4px 4px" : "0",
                        }}
                        initial={{ y: 0 }}
                        animate={isInView ? { y: "100%" } : { y: 0 }}
                        transition={{
                            duration: animationDuration,
                            delay: animationDelay + key.order * stagger,
                            ease: [0.45, 0, 0.55, 1],
                        }}
                    >
                        {key.isBlack ? (
                            <div
                                className="bg-gradient-to-b from-zinc-800 to-black w-full h-[60%]"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4,
                                }}
                            />
                        ) : null}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}