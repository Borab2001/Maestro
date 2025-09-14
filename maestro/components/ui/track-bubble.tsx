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
    <div className="relative flex items-center">
      {/* Bubble */}
      <motion.div
        onClick={onClick}
        className="relative cursor-pointer"
        initial={{ scale: 1 }}
        animate={{ 
          scale: isActive ? 1.5 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}
      >
        <div className={`
          w-4 h-4 rounded-full border-2 border-white/40 
          ${isActive ? 'bg-white' : 'bg-transparent'}
          transition-colors duration-300
        `} />
      </motion.div>

      {/* Track Info */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              duration: 0.3,
              delay: 0.1, // Delay after bubble expansion
              ease: "easeInOut"
            }}
            className="absolute left-8 whitespace-nowrap"
          >
            <h3 className="text-white font-medium text-lg">
              {track.title}
            </h3>
            <p className="text-white/60 text-sm mt-1">
              {track.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackBubble;