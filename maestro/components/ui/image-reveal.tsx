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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    // Parallax effect pour la variante fade-translate-parallax
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    // Animation variants basées sur le type d'animation
    const getAnimationProps = () => {
        if (animationType === "fade-in") {
            return {
                initial: { opacity: 0 },
                animate: isInView ? { opacity: 1 } : { opacity: 0 }
            };
        } else if (animationType === "fade-translate-parallax") {
            return {
                initial: { opacity: 0, y: 40 },
                animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            };
        } else {
            return {
                initial: { clipPath: "inset(100% 0% 0% 0%)" },
                animate: isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }
            };
        }
    };

    const animationProps = getAnimationProps();

    return (
        <motion.div 
            ref={ref}
            className={`relative ${className} ${animationType === "fade-translate-parallax" ? "overflow-hidden" : ""}`}
            initial={animationProps.initial}
            animate={animationProps.animate}
            transition={{ 
                duration, 
                ease,
                delay
            }}
        >
            <motion.div
                style={animationType === "fade-translate-parallax" ? { y: parallaxY } : {}}
                className="w-full h-full"
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
    );
};

export default ImageReveal;