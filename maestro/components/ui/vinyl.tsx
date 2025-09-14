"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const AlbumPlayer = ({ 
  coverUrl = "/images/group2.webp",
  tracks = [
    { title: "Runaway", description: "Un morceau emblématique avec des sonorités uniques" },
    { title: "Dark Fantasy", description: "Une ouverture dramatique et cinématographique" },
    { title: "Power", description: "Un hymne puissant et énergique" },
    { title: "All of the Lights", description: "Une collaboration étoilée aux arrangements complexes" },
    { title: "Monster", description: "Des flows agressifs sur une production sombre" }
  ]
}) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vinylOpen, setVinylOpen] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [expandingTrack, setExpandingTrack] = useState(null);
  
  const audioRef = useRef(null);
  const sectionRef = useRef(null);
  const intersectionRef = useRef(null);

  // Intersection Observer pour détecter quand la section est visible à 50%
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.5 }
    );

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-start pour le premier morceau
  useEffect(() => {
    if (isIntersecting && currentTrack === 0 && !vinylOpen) {
      setTimeout(() => {
        setVinylOpen(true);
        setTimeout(() => {
          setIsPlaying(true);
        }, 500); // Attend que l'animation d'ouverture soit terminée
      }, 300);
    }
  }, [isIntersecting, currentTrack, vinylOpen]);

  // Gestion de l'audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && vinylOpen) {
        audioRef.current.play().catch(e => console.log("Erreur audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, vinylOpen]);

  // Reset audio quand on change de track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [currentTrack]);

  const handleTrackClick = (index) => {
    if (index === currentTrack) return;
    
    // Animation de transition
    setExpandingTrack(index);
    setIsPlaying(false);
    
    setTimeout(() => {
      setCurrentTrack(index);
      setVinylOpen(true);
      setTimeout(() => {
        setIsPlaying(true);
        setExpandingTrack(null);
      }, 500);
    }, 200);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    handleTrackClick(next);
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    handleTrackClick(prev);
  };

  const vinylTransform = vinylOpen 
    ? "translate-x-1/2 rotate-[360deg]" 
    : "translate-x-0 rotate-[270deg]";

  const coverTransform = vinylOpen 
    ? "-translate-x-[10px] -rotate-2" 
    : "";

  return (
    <div 
      ref={intersectionRef}
      className="w-full min-h-screen text-white flex items-center justify-center"
    >
      <div 
        ref={sectionRef}
        className="w-full grid grid-cols-2 items-center justify-between gap-12 lg:gap-24"
      >
        <div className='flex flex-row gap-8 items-center'>
            <div className='flex flex-row lg:flex-col gap-4'>
                <button
                    aria-label='Previous Track'
                    onClick={prevTrack}
                    className="hidden lg:block p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                    <ChevronLeft className="w-6 h-6 lg:rotate-90" />
                </button>

                <button
                    aria-label='Next Track'
                    onClick={nextTrack}
                    className="hidden lg:block p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                    <ChevronRight className="w-6 h-6 lg:rotate-90" />
                </button>
            </div>
            <div className="flex flex-col lg:flex-col space-y-6 lg:space-y-8 order-2 lg:order-1">

            {tracks.map((track, index) => {
                const isActive = index === currentTrack;
                const isExpanding = expandingTrack === index;
                
                return (
                <div
                    key={index}
                    className={`
                        w-full relative cursor-pointer transition-all duration-500 ease-out
                    `}
                    onClick={() => handleTrackClick(index)}
                >
                    <div className={`
                    w-full rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                    transition-all duration-500 ease-out overflow-hidden
                    ${isActive || isExpanding 
                        ? 'px-8 py-4 bg-white/20 shadow-lg shadow-white/10' 
                        : 'px-6 py-3 hover:bg-white/15'
                    }
                    `}>
                    <div className={`
                        transition-all duration-300
                        ${isActive ? 'opacity-100' : 'opacity-0'}
                    `}>
                        {isActive && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{track.title}</h3>
                            <p className="text-sm text-white/70">{track.description}</p>
                        </div>
                        )}
                    </div>
                    
                    <div className={`
                        transition-all duration-300
                        ${isActive ? 'opacity-0 absolute' : 'opacity-100'}
                    `}>
                        <span className="font-medium">{track.title}</span>
                    </div>
                    </div>
                    
                    {/* Indicator dot */}
                    <div className={`
                    absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3
                    w-2 h-2 rounded-full bg-white transition-all duration-300
                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                    `} />
                </div>
                );
            })}
            </div>
        </div>


        {/* Vinyl Player - Desktop Right / Mobile Top */}
        <div className="relative flex flex-col items-center space-y-8 order-1 lg:order-2">
          {/* Vinyl Album Component */}
          <div className="relative w-[300px] h-[300px]">
            {/* Album Cover */}
            <div 
              className={`
                relative w-full h-full rounded-[3px] overflow-hidden z-20
                shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                transition-transform duration-500 ease-in-out
                ${coverTransform}
              `}
            >
              <img 
                src={coverUrl} 
                alt="Album Cover"
                className="w-full h-full object-cover"
              />
              
              {/* Top highlight */}
              <div className="
                absolute top-0 left-0 w-full h-[10%] z-30 pointer-events-none
                bg-gradient-to-b from-white/40 via-transparent to-transparent
              " />
              
              {/* Complex overlay effects */}
              <div className="
                absolute top-0 left-0 w-full h-full z-30 pointer-events-none
              " style={{
                background: `
                  linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 4%),
                  linear-gradient(225deg, 
                    rgba(162, 162, 162, 0.1) 0%, 
                    rgba(162, 162, 162, 0.2) 4%,
                    rgba(255, 255, 255, 0.2) 6%,
                    rgba(255, 255, 255, 0.6) 7%,
                    rgba(255, 255, 255, 0.2) 7%,
                    rgba(218, 218, 218, 0.04) 7%,
                    transparent 6%),
                  linear-gradient(45deg, 
                    rgba(14, 14, 14, 0.7),
                    rgba(0, 0, 0, 0.5) 0%, 
                    rgba(0, 0, 0, 0.2) 4%,
                    rgba(14, 14, 14, 0.2) 6%,
                    rgba(255, 255, 255, 0.3) 7%,
                    rgba(218, 218, 218, 0.4) 7%,
                    transparent 8%)
                `
              }} />
            </div>

            {/* Vinyl Record */}
            <div 
              className={`
                absolute top-[10px] right-0 w-[280px] h-[280px] rounded-full z-10
                flex justify-center items-center
                shadow-[0_0_30px_rgba(0,0,0,0.7)]
                transition-transform duration-500 ease-in-out
                ${vinylTransform}
                ${isPlaying && vinylOpen ? 'animate-spin [animation-duration:3s]' : ''}
              `}
              style={{
                background: `
                  conic-gradient(from 50deg at 50% 50%, 
                    transparent 46%, 
                    rgba(255, 255, 255, 0.1) 48%, 
                    rgba(255, 255, 255, 0.15) 51%, 
                    transparent 56%),
                  conic-gradient(from 225deg at 50% 50%, 
                    transparent 46%, 
                    rgba(255, 255, 255, 0.1) 48%, 
                    rgba(255, 255, 255, 0.15) 51%, 
                    transparent 56%),
                  repeating-radial-gradient(circle, 
                    rgba(120, 120, 120, 0.1) 0%, 
                    rgba(192, 192, 192, 0.01) 1px, 
                    transparent 1px, 
                    transparent 4px),
                  black
                `
              }}
            >
              {/* Vinyl Center */}
              <div 
                className="w-[100px] h-[100px] bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(${coverUrl})`,
                  boxShadow: '0 0 0 5px black'
                }}
              />
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-6 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src="/audios/runaway.mp3"
        loop
        preload="auto"
      />
    </div>
  );
};

export default AlbumPlayer;