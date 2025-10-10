"use client";

import { useState, useEffect, useRef } from "react";
import AnimatedLine from "./animated-line";
import VinylAlbum from "./vinyl";
import PlayButton from "./play-button";

interface Track {
    id: number;
    title: string;
    artists: string;
    audioUrl: string;
}

const tracks: Track[] = [
    {
        id: 1,
        title: "Premier Morceau",
        artists: "Artiste 1",
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 2,
        title: "Deuxième Morceau", 
        artists: "Artiste 2",
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 3,
        title: "Troisième Morceau",
        artists: "Artiste 3",
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 4,
        title: "Quatrième Morceau",
        artists: "Artiste 4",
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 5,
        title: "Cinquième Morceau",
        artists: "Artiste 5",
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 6,
        title: "Sixième Morceau",
        artists: "Artiste 6",
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 7,
        title: "Septième Morceau",
        artists: "Artiste 7",
        audioUrl: "/audios/runaway.mp3"
    },
    {
        id: 8,
        title: "Huitième Morceau",
        artists: "Artiste 8",
        audioUrl: "/audios/runaway.mp3"
    }
];

const AlbumSection = () => {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVinylOpen, setIsVinylOpen] = useState(false);
    
    const audioRef = useRef<HTMLAudioElement>(null);
    const isPlayingRef = useRef(isPlaying);

    // Mettre à jour la ref quand isPlaying change
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Audio control simple - play/pause seulement
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(console.error);
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    // Changement de track uniquement
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.src = tracks[currentTrack].audioUrl;
        audio.load();
        
        // Relancer seulement si on était en train de jouer
        if (isPlayingRef.current) {
            audio.play().catch(console.error);
        }
    }, [currentTrack]);

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

    return (
        <section className="py-16">
            <audio
                ref={audioRef}
                loop
                preload="metadata"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                <div className="col-span-1 pt-4 md:pt-8 lg:pt-[58px] flex flex-col md:flex-row lg:flex-col items-center md:items-start gap-4 md:gap-8">
                    {/* <div className="aspect-square flex items-center justify-center"> */}
                        <VinylAlbum
                            coverUrl="/images/group2.webp"
                            isOpen={isVinylOpen}
                            isSpinning={isPlaying}
                            size="normal"
                        />
                    {/* </div> */}
                    <div className="flex flex-col gap-4 items-start">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-medium">Album</h3>
                            <p className="text-secondary">2026</p>
                        </div>
                            
                        <PlayButton 
                            isPlaying={isPlaying}
                            onClick={handlePlayPause}
                        />
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2 flex flex-col gap-0">
                    <div className="w-full flex flex-row items-center">
                        <div className="w-full h-[58px] flex items-center">
                            <p>Morceau</p>
                        </div>
                        <div className="w-full h-[58px] flex items-center">
                            <p>Artistes</p>
                        </div>
                    </div>
                    <AnimatedLine delay={0.2} />

                    {tracks.map((track, index) => (
                        <div key={track.id}>
                            <div 
                                className={`w-full flex flex-row items-center cursor-pointer hover:bg-white/5 transition-colors duration-200 ${
                                    index === currentTrack ? 'bg-white/10' : ''
                                }`}
                                onClick={() => handleTrackSelect(index)}
                            >
                                <div className="w-full min-h-[58px] flex items-center">
                                    <p className={index === currentTrack ? 'text-white font-medium' : 'text-current'}>
                                        {track.title}
                                    </p>
                                </div>
                                <div className="w-full min-h-[58px] flex items-center">
                                    <p className={index === currentTrack ? 'text-white font-medium' : 'text-current'}>
                                        {track.artists}
                                    </p>
                                </div>
                            </div>
                            <AnimatedLine delay={0.3 + (index * 0.05)} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlbumSection;