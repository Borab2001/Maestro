import Image from "next/image";

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
                <div className="flex items-center gap-2 h-[600px] w-full px-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative group flex-grow transition-all w-56 overflow-hidden h-[600px] duration-500 hover:w-full"
                        >
                        <Image
                            className="h-full w-full object-cover object-center"
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                        />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}