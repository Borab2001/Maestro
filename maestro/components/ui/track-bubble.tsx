"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TrackBubbleProps {
    track: {
        id: number;
        title: string;
        description: string;
    };
    isActive: boolean;
    onClick: () => void;
}

const TrackBubble = ({ track, isActive, onClick }: TrackBubbleProps) => {
    return (
        <div className="flex items-center">
            {/* Bubble */}
            <motion.div
                onClick={onClick}
                className="cursor-pointer"
                animate={{ 
                    height: isActive ? 100 : 20
                }}
                    transition={{
                    duration: 0.4,
                    ease: "easeInOut"
                }}
            >
                {/* Track Info */}
                <AnimatePresence>
                    <h3 className="text-white font-medium text-base">
                        {track.title}
                    </h3>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.4, // Delay after bubble expansion
                                ease: "easeInOut"
                            }}
                            className="whitespace-nowrap"
                        >
                            <p className="text-neutral-400 text-sm mt-1">
                                {track.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
    );
};

export default TrackBubble;