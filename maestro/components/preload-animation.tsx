'use client';

import { useState, useEffect, useRef } from 'react';
import { MusicNoteIcon, type MusicNoteIconHandle } from './ui/music-note-icon';
import gsap from 'gsap';


const PreloadAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const prevUrlRef = useRef<string | null>(null);
  const musicNoteRef = useRef<MusicNoteIconHandle>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Stocker l'URL actuelle comme référence
        prevUrlRef.current = window.location.href;
    
        // Démarrer l'animation dès le montage du composant
        if (musicNoteRef.current) {
            musicNoteRef.current.startAnimation();
        }
    
        // Fonction pour vérifier si l'utilisateur vient d'un site externe
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // L'utilisateur est revenu sur l'onglet
                const currentUrl = window.location.href;
                const referrer = document.referrer;
                
                // Vérifier si le referrer est externe (n'appartient pas au même domaine)
                const isExternalNavigation = referrer && 
                !referrer.includes(window.location.hostname) && 
                prevUrlRef.current !== currentUrl;
                
                if (isExternalNavigation) {
                    // L'utilisateur revient d'un site externe
                    setShowAnimation(true);
                    
                    // Réinitialiser l'opacité de l'overlay
                    if (overlayRef.current) {
                        gsap.set(overlayRef.current, { opacity: 1 });
                    }
                    
                    if (musicNoteRef.current) {
                        musicNoteRef.current.startAnimation();
                    }
                    
                    // Masquer l'animation après un délai
                    const timer = setTimeout(() => {
                        fadeOutAnimation();
                    }, 3000);
                    
                    return () => clearTimeout(timer);
                }
                
                // Mettre à jour l'URL de référence
                prevUrlRef.current = currentUrl;
            }
        };
    
        // Fonction pour la sortie en fondu
        const fadeOutAnimation = () => {
            // Arrêter l'animation cyclique
            if (musicNoteRef.current) {
                musicNoteRef.current.stopAnimation();
            }
            
            // Faire disparaître l'overlay
            if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.inOut",
                    onComplete: () => setShowAnimation(false)
                });
            } else {
                setShowAnimation(false);
            }
        };
    
        // Déclencher la fin de l'animation après un délai
        const timer = setTimeout(() => {
            fadeOutAnimation();
        }, 3300);
    
        // Ajouter l'écouteur d'événement pour la visibilité
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
            clearTimeout(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (musicNoteRef.current) {
                musicNoteRef.current.stopAnimation();
            }
        };
    }, []);

    if (!showAnimation) return null;

    return (
        <div ref={overlayRef} className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <MusicNoteIcon 
                ref={musicNoteRef} 
                size={120} 
                className="text-white" 
            />
        </div>
    );
};

export default PreloadAnimation;