"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
    
    // Hook pour détecter la taille d'écran
    const useMediaQuery = (query: string) => {
        const [matches, setMatches] = useState(false);

        useEffect(() => {
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = () => setMatches(media.matches);
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }, [matches, query]);

        return matches;
    };

    const isMdScreen = useMediaQuery('(min-width: 768px)');
    
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
            // Animation clipPath responsive
            const clipPathInitial = isMdScreen ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";
            const clipPathAnimate = "inset(0% 0% 0% 0%)";
            
            return {
                initial: { clipPath: clipPathInitial },
                animate: isInView ? { clipPath: clipPathAnimate } : { clipPath: clipPathInitial }
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