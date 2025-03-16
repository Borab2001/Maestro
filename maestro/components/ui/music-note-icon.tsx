"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";


export interface MusicNoteIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface MusicNoteIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const MusicNoteIcon = forwardRef<MusicNoteIconHandle, MusicNoteIconProps>(
    ({ className, size = 28, ...props }, ref) => {
        const stemRef = useRef(null);
        const noteHeadRef = useRef(null);
        const flagRef = useRef(null);
        const isControlledRef = useRef(false);
        const timelineRef = useRef<gsap.core.Timeline | null>(null);

        // Initialiser les attributs SVG pour l'animation
        useEffect(() => {
            // Cacher immédiatement les éléments au chargement
            const elements = [stemRef.current, noteHeadRef.current, flagRef.current];
            elements.forEach(el => {
                if (el) {
                    gsap.set(el, {
                        strokeDasharray: "100%",
                        strokeDashoffset: "100%",
                        opacity: 0
                    });
                }
            });
            
            return () => {
                // Nettoyage
                if (timelineRef.current) {
                    timelineRef.current.kill();
                }
                gsap.killTweensOf(elements);
            };
        }, []);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => {
                // Arrêter l'animation précédente si elle est en cours
                if (timelineRef.current) {
                    timelineRef.current.kill();
                }

                // S'assurer que les éléments sont bien masqués au départ
                gsap.set([stemRef.current, noteHeadRef.current, flagRef.current], {
                    opacity: 0,
                    strokeDasharray: "100%",
                    strokeDashoffset: "100%",
                });

                // Créer une timeline pour l'animation
                const tl = gsap.timeline({
                    repeat: -1,    // Répéter indéfiniment
                    repeatDelay: 0.3, // Petite pause entre les répétitions
                });

                // Dessiner la tige
                tl.to(stemRef.current, {
                    duration: 0.4,
                    opacity: 1,
                    strokeDashoffset: 0,
                    ease: "power1.inOut",
                });

                // Dessiner la tête de note
                tl.to(noteHeadRef.current, {
                    duration: 0.3,
                    opacity: 1,
                    strokeDashoffset: 0,
                    ease: "power1.inOut",
                }, "-=0.1"); // Commencer légèrement avant la fin de l'animation précédente

                // Dessiner le drapeau
                tl.to(flagRef.current, {
                    duration: 0.4,
                    opacity: 1,
                    strokeDashoffset: 0,
                    ease: "power1.inOut",
                }, "-=0.1");

                // Faire une pause avec la note complète
                tl.to({}, { duration: 0.5 });

                // Faire disparaître les éléments
                tl.to([stemRef.current, noteHeadRef.current, flagRef.current], {
                    duration: 0.4,
                    opacity: 0,
                    strokeDashoffset: "100%",
                    ease: "power1.in",
                    stagger: 0.1
                });

                // Stocker la timeline pour pouvoir l'arrêter plus tard
                timelineRef.current = tl;
                },
                stopAnimation: () => {
                    if (timelineRef.current) {
                        // Finir le cycle actuel et arrêter
                        timelineRef.current.pause();
                        
                        // Faire un fondu sur tous les éléments
                        gsap.to([stemRef.current, noteHeadRef.current, flagRef.current], {
                            duration: 0.4,
                            opacity: 0,
                            ease: "power2.in",
                            onComplete: () => {
                                if (timelineRef.current) {
                                    timelineRef.current.kill();
                                    timelineRef.current = null;
                                }
                            }
                        });
                    }
                },
            };
        });

        return (
            <div
                className={cn(
                    `select-none flex items-center justify-center`,
                    className
                )}
                {...props}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                {/* Stem */}
                <line 
                    ref={stemRef} 
                    x1="9" 
                    y1="17" 
                    x2="9" 
                    y2="5" 
                />

                {/* Note head */}
                <ellipse
                    ref={noteHeadRef}
                    cx="6"
                    cy="17"
                    rx="3"
                    ry="2"
                />

                {/* Flag */}
                <path
                    ref={flagRef}
                    d="M9 5C12 5 15 4 15 2C15 4 18 5 18 7C18 9 15 10 12 10C12 8 9 7 9 5Z"
                />
                </svg>
            </div>
        );
    }
);

MusicNoteIcon.displayName = "MusicNoteIcon";

export { MusicNoteIcon };