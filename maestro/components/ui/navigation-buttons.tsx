"use client";

import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isMobile?: boolean;
}

const NavigationButtons = ({ 
  onPrevious, 
  onNext, 
  canGoPrevious, 
  canGoNext,
  isMobile = false 
}: NavigationButtonsProps) => {
  const PrevIcon = isMobile ? ChevronLeft : ChevronUp;
  const NextIcon = isMobile ? ChevronRight : ChevronDown;

  return (
    <div className={`flex ${isMobile ? 'flex-row space-x-4' : 'flex-col space-y-4'}`}>
      <motion.button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`
          w-8 h-8 rounded-full border border-white/40 
          flex items-center justify-center
          ${canGoPrevious ? 'text-white hover:bg-white/10' : 'text-white/30 cursor-not-allowed'}
          transition-colors duration-200
        `}
        whileHover={canGoPrevious ? { scale: 1.1 } : {}}
        whileTap={canGoPrevious ? { scale: 0.95 } : {}}
      >
        <PrevIcon size={14} />
      </motion.button>

      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        className={`
          w-8 h-8 rounded-full border border-white/40 
          flex items-center justify-center
          ${canGoNext ? 'text-white hover:bg-white/10' : 'text-white/30 cursor-not-allowed'}
          transition-colors duration-200
        `}
        whileHover={canGoNext ? { scale: 1.1 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
      >
        <NextIcon size={14} />
      </motion.button>
    </div>
  );
};

export default NavigationButtons;