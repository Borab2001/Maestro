// import Image from "next/image";
import { useState, useEffect } from "react";
import ImageReveal from "./image-reveal";

interface ImageGalleryProps {
    images: Array<{
        src: string;
        alt: string;
    }>;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [animationsComplete, setAnimationsComplete] = useState(false);
    const [expandedImage, setExpandedImage] = useState<number | null>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Détecter si c'est un appareil tactile
    useEffect(() => {
        const checkTouchDevice = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        
        checkTouchDevice();
        window.addEventListener('resize', checkTouchDevice);
        return () => window.removeEventListener('resize', checkTouchDevice);
    }, []);

    // Calculer quand toutes les animations sont terminées
    useEffect(() => {
        const lastImageDelay = (images.length - 1) * 0.1;
        const animationDuration = 1.8;
        const totalTime = (lastImageDelay + animationDuration) * 1000;

        const timer = setTimeout(() => {
            setAnimationsComplete(true);
        }, totalTime);

        return () => clearTimeout(timer);
    }, [images.length]);

    const handleImageClick = (index: number) => {
        if (!animationsComplete || !isTouchDevice) return;
        setExpandedImage(expandedImage === index ? null : index);
    };

    return (
        <>
            <section className="w-full flex flex-col items-center justify-start py-12">
                <div className="flex flex-col md:flex-row items-center gap-2 h-[600px] sm:h-[900px] md:h-[600px] w-full">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative group flex-grow transition-all w-full md:w-56 overflow-hidden h-56 md:h-[600px] duration-500
                                ${animationsComplete ? '' : 'pointer-events-none'}
                                ${expandedImage === index ? 'h-full sm:w-full' : ''}
                                ${animationsComplete ? 'hover:h-full sm:hover:w-full' : ''}
                                ${isTouchDevice ? 'cursor-pointer' : 'cursor-default'}
                            `}
                            onClick={() => handleImageClick(index)}
                        >
                            <ImageReveal
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-cover object-center"
                                duration={1.8}
                                delay={index * 0.1}
                                animationType="clip-path"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}