"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { Easing, Variants } from "framer-motion";
import { useRef } from "react";

interface ImageRevealProps {
    src: string;
    alt: string;
    className?: string;
    duration?: number;
    delay?: number;
    ease?: Easing;
    animationType: "clip-path" | "fade-in" | "fade-translate-parallax" | "none";
}

const ImageReveal = ({ 
    src, 
    alt, 
    className = "", 
    duration = 0.8,
    // duration = 1, 
    delay = 0,
    ease = [0.25, 0.46, 0.45, 0.94],
    // ease = [0.87, 0, 0.13, 1]
    animationType = "fade-in"
}: ImageRevealProps) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "50px 0px" });

    // Parallax effect only for fade-translate-parallax
    const { scrollYProgress } = useScroll({
        target: animationType === "fade-translate-parallax" ? containerRef : undefined,
        offset: ["start end", "end start"]
    });
    
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    if (animationType === "none") {
        return (
            <div className={`relative ${className}`}>
                <Image 
                    src={src} 
                    alt={alt} 
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
            </div>
        );
    }

    const getVariants = (): Variants => {
        switch (animationType) {
            case "fade-in":
                return {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 }
                };
            case "fade-translate-parallax":
                return {
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 }
                };
            case "clip-path":
                return {
                    initial: { clipPath: "inset(0% 100% 0% 0%)" },
                    animate: { clipPath: "inset(0% 0% 0% 0%)" }
                };
            default:
                return {};
        }
    };

    return (
        <motion.div 
            ref={containerRef}
            className={`relative w-full h-full ${className} ${animationType === "fade-translate-parallax" ? "overflow-hidden" : ""}`}
            variants={getVariants()}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ 
                duration, 
                ease,
                delay
            }}
        >
            {animationType === "fade-translate-parallax" ? (
                <motion.div
                    style={{ y: parallaxY, willChange: "transform" }}
                    className="w-full  h-[120%] -mt-[10%]"
                >
                    <Image 
                        src={src} 
                        alt={alt} 
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
                    />
                </motion.div>
            ) : (
                <Image 
                    src={src} 
                    alt={alt} 
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
                />
            )}
        </motion.div>
    );
};

export default ImageReveal;