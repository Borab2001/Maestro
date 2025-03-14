'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';


interface ImageItem {
    src: string;
    alt: string;
}

const InfiniteGallery: React.FC = () => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const images: ImageItem[] = [
        { src: '/images/group.webp', alt: 'Performance Maestro 1' },
        { src: '/images/group.webp', alt: 'Performance Maestro 2' },
        { src: '/images/group.webp', alt: 'Performance Maestro 3' },
        { src: '/images/group.webp', alt: 'Performance Maestro 4' },
        { src: '/images/group.webp', alt: 'Performance Maestro 5' },
    ];

    useEffect(() => {
        let animationInstance: gsap.core.Tween | null = null;
        
        const setupAnimation = (): (() => void) | undefined => {
            if (!trackRef.current || !wrapperRef.current) return;
            
            // Kill any existing animations to prevent conflicts
            if (animationInstance) animationInstance.kill();

            // Clone the track to create the infinite loop
            const track = trackRef.current;
            const wrapper = wrapperRef.current;
            
            // Reset to starting position
            gsap.set(track, { x: 0 });
        
            // Calculate the width we need to move for looping
            const items = Array.from(track.children);
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = 32; // Same as the gap in the CSS
        
            // Clone nodes if needed (ensuring we have duplicates for proper looping)
            if (track.children.length === images.length) {
                // Create duplicates for continuous scrolling
                images.forEach((_, i) => {
                    const clone = items[i].cloneNode(true) as HTMLElement;
                    track.appendChild(clone);
                });
            }
        
            // Determine the scroll offset (width of original set of images + gaps)
            const scrollOffset = images.length * (itemWidth + gap);
            
            // Create the infinite loop
            animationInstance = gsap.to(track, {
                x: -scrollOffset,
                duration: 20,
                ease: "none",
                repeat: -1,
                onRepeat: () => {
                    // When we hit the repeat point, immediately jump back to start
                    gsap.set(track, { x: 0 });
                }
            });
        
            // Efficiency: pause when not in viewport
            const observer = new IntersectionObserver(
                (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animationInstance?.play();
                    } else {
                        animationInstance?.pause();
                    }
                });
                },
                { threshold: 0.1 }
            );
            
            observer.observe(wrapper);
            
            return () => {
                observer.disconnect();
            };
        };
        
        // Set up the animation after a brief delay to ensure DOM is ready
        const timer = setTimeout(setupAnimation, 100);
        
        // Set up resize handler to recalculate dimensions
        const handleResize = (): void => {
        clearTimeout(timer);
        setTimeout(setupAnimation, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
        if (animationInstance) animationInstance.kill();
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        };
    }, [images.length]);

    return (
        <div className="py-6 md:py-12 pointer-events-none select-none">
            <div 
                ref={wrapperRef}
                className="overflow-hidden relative" 
                style={{ marginBottom: "2rem" }}
            >
                <div 
                    ref={trackRef}
                    className="flex gap-8 will-change-transform"
                >
                    {images.map((image, index) => (
                        <div 
                            key={`img-${index}`}
                            className="relative min-w-96 w-[35vw] aspect-[16/12] flex-shrink-0 rounded-lg overflow-hidden"
                        >
                            <Image 
                                src={image.src} 
                                alt={image.alt} 
                                fill
                                className="object-cover"
                                priority={index < 2}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfiniteGallery;