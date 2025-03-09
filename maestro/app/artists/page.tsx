import Image from "next/image";

const Artists = () => {
    return (
        <div className="grid grid-cols-2 h-svh">
            <Image
                src="/images/axelle.webp"
                alt="Artist"
                width={1920}
                height={1080}
                className="w-full h-full object-cover object-center"
            />
            <div className="pt-18 px-4 flex items-center justify-start">
                <p className="text-4xl">Axelle is a pianist, originally from Chelles</p>
            </div>
        </div>
    );
}
 
export default Artists;