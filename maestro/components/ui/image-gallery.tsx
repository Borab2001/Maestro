// import Image from "next/image";
import ImageReveal from "./image-reveal";

interface ImageGalleryProps {
    images: Array<{
        src: string;
        alt: string;
    }>;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    return (
        <>
            <section className="w-full flex flex-col items-center justify-start py-12">
                <div className="flex flex-col md:flex-row items-center gap-2 h-[600px] sm:h-[900px] md:h-[600px] w-full">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative group flex-grow transition-all w-full md:w-56 overflow-hidden h-56 md:h-[600px] duration-500 hover:h-full sm:hover:w-full"
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