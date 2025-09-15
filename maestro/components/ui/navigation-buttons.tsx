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
          w-8 h-8 rounded-full border border-neutral-400
          flex items-center justify-center
          ${canGoPrevious ? 'text-white hover:bg-white/10 cursor-pointer' : 'text-neutral-400 cursor-not-allowed'}
          transition-colors duration-200
        `}
      >
        <PrevIcon size={16} />
      </motion.button>

      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        className={`
          w-8 h-8 rounded-full border border-neutral-400
          flex items-center justify-center
          ${canGoNext ? 'text-white hover:bg-white/10 cursor-pointer' : 'text-neutral-400 cursor-not-allowed'}
          transition-colors duration-200
        `}
      >
        <NextIcon size={16} />
      </motion.button>
    </div>
  );
};

export default NavigationButtons;