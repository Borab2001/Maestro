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
    },
    {
        id: 5,
        title: "Cinquième Morceau",
        description: "Description du cinquième morceau", 
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 6,
        title: "Sixième Morceau",
        description: "Description du sixième morceau", 
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 7,
        title: "Septième Morceau",
        description: "Description du septième morceau", 
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 8,
        title: "Huitième Morceau",
        description: "Description du huitième morceau", 
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 9,
        title: "Neuvième Morceau",
        description: "Description du troisième morceau", 
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 10,
        title: "Dixième Morceau",
        description: "Description du dixième morceau", 
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
    const isInView = useInView(sectionRef, { amount: 0.8 });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-start when section is 80% in view
    useEffect(() => {
        if (isInView && currentTrack === 0 && !isVinylOpen) {
        const timer = setTimeout(() => {
            setIsVinylOpen(true);
            // Wait for vinyl opening animation to complete
            const playTimer = setTimeout(() => {
            setIsPlaying(true);
            }, 1000);
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
        // if (isMobile) return 0;
        const offset = (index - currentTrack) * 40; // 60px spacing
        return offset;
    };

    return (
        <section 
            ref={sectionRef}
            className={`
                relative overflow-x-hidden h-screen w-screen flex items-center justify-center pt-[72px] bg-background
            `}
        >
            <audio
                ref={audioRef}
                loop
                preload="metadata"
            />

            <div className={`
                relative w-full h-full 
                ${isMobile 
                    ? 'h-full flex flex-col' 
                    : 'flex flex-row gap-8'
                }
            `}>
                <div className={`
                    w-full max-w-96 col-span-1 md:col-span-2
                    ${isMobile 
                        ? '' 
                        : 'p-4 relative flex items-center'
                    }
                `}>
                    <div className="max-h-[580px] w-full flex flex-row justify-start items-center gap-8 bg-white/1 rounded-3xl p-6 overflow-hidden">    
                        {/* <div className="absolute inset-0 z-20 pointer-events-none" /> */}
                        {/* Navigation Buttons */}
                        <div className={`
                            ${isMobile 
                                ? 'hidden' 
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
                            relative py-16
                            ${isMobile 
                                ? 'flex h-full justify-center items-center'
                                : 'w-full'
                            }
                        `}>
                            {tracks.map((track, index) => (
                                <motion.div
                                    key={track.id}
                                    className="relative transition-transform duration-1000 ease-in-out"
                                    style={{
                                        transform: isMobile 
                                            ? `translateX(${getTrackTransform(index)}px)`
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
                    </div>
                </div>

                {/* Desktop: Vinyl Right, Mobile: Vinyl Top */}
                <div className={`
                    w-full
                    ${isMobile 
                        ? 'order-1 flex-1 flex items-center justify-center' 
                        : 'flex flex-col items-center justify-center'
                    }
                `}>
                    <div className="w-auto sm:w-[450px] h-auto flex justify-start">
                        <div className="block scale-75 -translate-x-1/6 sm:scale-100 md:scale-125 sm:translate-x-0">
                            <VinylAlbum
                                coverUrl="/images/group2.webp"
                                isOpen={isVinylOpen}
                                isSpinning={isPlaying}
                                size="normal"
                            />
                        </div>
                    </div>

                    {/* Play Button */}
                    <div className={`
                        ${isMobile 
                            ? 'absolute -top-16 right-8' 
                            : 'mt-8 md:mt-12'
                        }
                    `}>
                        <PlayButton 
                            isPlaying={isPlaying}
                            onClick={handlePlayPause}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AlbumSection;