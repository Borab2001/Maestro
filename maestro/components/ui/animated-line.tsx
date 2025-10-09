"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedLineProps {
    delay?: number;
    duration?: number;
    className?: string;
}

const AnimatedLine = ({ 
    delay = 0, 
    duration = 0.8,
    className = "h-px bg-neutral-600" 
}: AnimatedLineProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="w-full h-px bg-transparent">
            <motion.div
                className={className}
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ 
                    duration, 
                    ease: [0.87, 0, 0.13, 1],
                    delay
                }}
            />
        </div>
    );
};

export default AnimatedLine;