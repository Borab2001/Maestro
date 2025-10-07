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
}

const ImageReveal = ({ 
    src, 
    alt, 
    className = "", 
    duration = 1, 
    delay = 0,
    ease = [0.76, 0, 0.24, 1],
}: ImageRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div 
            ref={ref}
            className={`relative ${className}`}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }}
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