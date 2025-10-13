"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageRevealProps {
    src: string;
    alt: string;
    className?: string;
    duration?: number;
    delay?: number;
    ease?: string | number[];
    animationType: "clip-path" | "fade-in" | "fade-translate-parallax";
}

const ImageReveal = ({ 
    src, 
    alt, 
    className = "", 
    duration = 1, 
    delay = 0,
    ease = [0.87, 0, 0.13, 1],
    animationType = "clip-path"
    }: ImageRevealProps) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    const getAnimationProps = (inView: boolean) => {
        if (animationType === "fade-in") {
            return {
                initial: { opacity: 0 },
                animate: inView ? { opacity: 1 } : { opacity: 0 }
            };
        } else if (animationType === "fade-translate-parallax") {
            return {
                initial: { opacity: 0, y: 40 },
                animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            };
        }
        return { initial: {}, animate: {} };
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <motion.div 
                className={`relative w-full h-full md:hidden ${animationType === "fade-translate-parallax" ? "overflow-hidden" : ""}`}
                initial={animationType === "clip-path" ? { clipPath: "inset(0% 100% 0% 0%)" } : getAnimationProps(isInView).initial}
                animate={animationType === "clip-path" ? 
                    (isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(0% 100% 0% 0%)" }) : 
                    getAnimationProps(isInView).animate
                }
                transition={{ 
                    duration, 
                    ease,
                    delay
                }}
            >
                <motion.div
                    style={animationType === "fade-translate-parallax" ? { 
                        y: parallaxY,
                        willChange: "transform"
                    } : {}}
                    className={animationType === "fade-translate-parallax" ? "w-full h-[120%] -mt-[10%]" : "w-full h-full"}
                >
                    <Image 
                        src={src} 
                        alt={alt} 
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </motion.div>

            <motion.div 
                className={`relative w-full h-full hidden md:block ${animationType === "fade-translate-parallax" ? "overflow-hidden" : ""}`}
                initial={animationType === "clip-path" ? { clipPath: "inset(100% 0% 0% 0%)" } : getAnimationProps(isInView).initial}
                animate={animationType === "clip-path" ? 
                    (isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }) : 
                    getAnimationProps(isInView).animate
                }
                transition={{ 
                    duration, 
                    ease,
                    delay
                }}
            >
                <motion.div
                    style={animationType === "fade-translate-parallax" ? { 
                        y: parallaxY,
                        willChange: "transform"
                    } : {}}
                    className={animationType === "fade-translate-parallax" ? "w-full h-[120%] -mt-[10%]" : "w-full h-full"}
                >
                    <Image 
                        src={src} 
                        alt={alt} 
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ImageReveal;