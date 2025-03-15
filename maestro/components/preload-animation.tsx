// components/PreloadAnimation.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

const PreloadAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const prevUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Stocker l'URL actuelle comme référence
    prevUrlRef.current = window.location.href;
    
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
          
          // Masquer l'animation après un délai
          const timer = setTimeout(() => {
            setShowAnimation(false);
          }, 3000);
          
          return () => clearTimeout(timer);
        }
        
        // Mettre à jour l'URL de référence
        prevUrlRef.current = currentUrl;
      }
    };
    
    // Déclencher l'animation à la première visite
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
    
    // Ajouter l'écouteur d'événement pour la visibilité
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default PreloadAnimation;