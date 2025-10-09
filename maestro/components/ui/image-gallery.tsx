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
                <div className="flex items-center gap-2 h-[600px] w-full">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative group flex-grow transition-all w-56 overflow-hidden h-[600px] duration-500 hover:w-full"
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