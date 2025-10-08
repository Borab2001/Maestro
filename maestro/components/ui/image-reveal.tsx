"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ImageRevealProps {
    src: string;
    alt: string;
    className?: string;
    duration?: number;
    delay?: number;
    ease?: string | number[];
    animationType: "clip-path" | "fade-in";
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

    // Animation variants basées sur le type d'animation
    const getAnimationProps = () => {
        if (animationType === "fade-in") {
            return {
                initial: { opacity: 0 },
                animate: isInView ? { opacity: 1 } : { opacity: 0 }
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
            className={`relative ${className}`}
            initial={animationProps.initial}
            animate={animationProps.animate}
            transition={{ 
                duration, 
                ease,
                delay
            }}
        >
            <Image 
                src={src} 
                alt={alt} 
                fill
                className="object-cover"
                priority
            />
        </motion.div>
    );
};

export default ImageReveal;