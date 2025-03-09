import Image from "next/image";

const Artists = () => {
    return (
        <div className="grid grid-cols-2">
            <Image
                src="/images/artist.jpg"
                alt="Artist"
                width={1920}
                height={1080}
            />
            <div>
                <p>Axelle is a pianist, originally from Chelles</p>
            </div>
        </div>
    );
}
 
export default Artists;