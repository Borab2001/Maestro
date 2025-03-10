import Image from "next/image";
import artists from "@/data/artists.json";
import { notFound } from "next/navigation";


interface ArtistProps {
    params: { id: string };
};


const ArtistPage: React.FC<ArtistProps> = ({
    params
}) => {

    const artist = artists.find((a) => a.id === params.id);

    if (!artist) {
        return notFound();
      }

    return (
        <div className="grid grid-cols-2">
            <div className="flex h-screen">
                <Image
                    src={artist.image}
                    alt={`${artist.name} portrait`}
                    width={1920}
                    height={1080}
                    className="flex-1 w-full object-cover object-center"
                />
            </div>
            <div className="pt-18 px-4 flex items-center justify-start">
                <h1>{artist.name}</h1>
                <p className="text-4xl [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{artist.bio}</p>

            </div>
        </div>
    );
}
 
export default ArtistPage;