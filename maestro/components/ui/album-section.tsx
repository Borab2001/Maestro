"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import VinylAlbum from "./vinyl";
import TrackBubble from "./track-bubble";
import PlayButton from "./play-button";
import NavigationButtons from "./navigation-buttons";

interface Track {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Premier Morceau",
    description: "Description du premier morceau",
    audioUrl: "/audios/runaway.mp3"
  },
  {
    id: 2,
    title: "Deuxième Morceau", 
    description: "Description du deuxième morceau",
    audioUrl: "/audios/runaway.mp3"
  },
  {
    id: 3,
    title: "Troisième Morceau",
    description: "Description du troisième morceau", 
    audioUrl: "/audios/runaway.mp3"
  },
  {
    id: 4,
    title: "Quatrième Morceau",
    description: "Description du quatrième morceau",
    audioUrl: "/audios/runaway.mp3"
  }
];

const AlbumSection = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVinylOpen, setIsVinylOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-start when section is 50% in view
  useEffect(() => {
    if (isInView && currentTrack === 0 && !isVinylOpen) {
      const timer = setTimeout(() => {
        setIsVinylOpen(true);
        // Wait for vinyl opening animation to complete
        const playTimer = setTimeout(() => {
          setIsPlaying(true);
        }, 500);
        return () => clearTimeout(playTimer);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, currentTrack, isVinylOpen]);

  // Audio control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Change track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = tracks[currentTrack].audioUrl;
    audio.load();
    
    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrack, isPlaying]);

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    if (!isVinylOpen) {
      setIsVinylOpen(true);
      setTimeout(() => setIsPlaying(true), 500);
    } else if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (!isVinylOpen) {
      setIsVinylOpen(true);
      setTimeout(() => setIsPlaying(true), 500);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  const handleNext = () => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  // Transform tracks for mobile (centered active track)
  const getTrackTransform = (index: number) => {
    if (isMobile) return 0;
    const offset = (index - currentTrack) * 60; // 60px spacing
    return offset;
  };

  return (
    <section 
      ref={sectionRef}
      className={`
        relative overflow-hidden
        ${isMobile ? 'h-screen' : 'min-h-screen'}
        flex items-center justify-center
      `}
    >
      <audio
        ref={audioRef}
        loop
        preload="metadata"
      />

      <div className={`
        relative w-full
        ${isMobile 
          ? 'h-full flex flex-col' 
          : 'grid grid-cols-2 gap-16 items-center h-full'
        }
      `}>
        
        <div className={`
          ${isMobile 
            ? 'order-2 flex-shrink-0 z-10 relative' 
            : 'flex flex-col justify-center'
          }
        `}>
          {/* Navigation Buttons */}
          <div className={`
            ${isMobile 
              ? 'absolute -top-16 left-1/2 transform -translate-x-1/2' 
              : 'mb-8'
            }
          `}>
            <NavigationButtons 
              onPrevious={handlePrevious}
              onNext={handleNext}
              canGoPrevious={currentTrack > 0}
              canGoNext={currentTrack < tracks.length - 1}
              isMobile={isMobile}
            />
          </div>

          {/* Track List */}
          <div className={`
            relative
            ${isMobile 
              ? 'flex justify-center items-center space-x-8 py-8' 
              : 'space-y-16'
            }
          `}>
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                className="relative"
                style={{
                  transform: isMobile 
                    ? 'none' 
                    : `translateY(${getTrackTransform(index)}px)`
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <TrackBubble
                  track={track}
                  isActive={index === currentTrack}
                  onClick={() => handleTrackSelect(index)}
                />
              </motion.div>
            ))}
          </div>

          {/* Play Button */}
          <div className={`
            ${isMobile 
              ? 'absolute -top-16 right-8' 
              : 'mt-8'
            }
          `}>
            <PlayButton 
              isPlaying={isPlaying}
              onClick={handlePlayPause}
            />
          </div>
        </div>

        {/* Desktop: Vinyl Right, Mobile: Vinyl Top */}
        <div className={`
          ${isMobile 
            ? 'order-1 flex-1 flex items-center justify-center' 
            : 'flex items-center justify-center'
          }
        `}>
          <VinylAlbum
            coverUrl="/images/group2.webp"
            isOpen={isVinylOpen}
            isSpinning={isPlaying}
            size="normal"
          />
        </div>
      </div>
    </section>
  );
};

export default AlbumSection;