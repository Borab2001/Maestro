import Image from "next/image";
import concerts from "@/data/concerts.json";

const Concerts = () => {
    return (
        <div className="min-h-screen px-4 md:px-8 pt-[72px]">
            <section className="py-6 md:py-12">
                <div className="w-full md:w-[70%] max-w-5xl pb-48 flex flex-col gap-4 md:gap-8">
                    <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium mb-6">Concerts</h1>
                    <p className="text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat repellendus, harum dolorem tempore, eius aperiam recusandae voluptate omnis dolorum soluta provident voluptatibus error dignissimos saepe sequi similique ea voluptas nam?</p>
                </div>
            </section>
            
            {concerts.slice().reverse().map((concert) => (
                <section className="py-24" key={concert.name}>
                    <div 
                        className="grid grid-cols-1 lg:grid-cols-5 gap-8" 
                    >
                        <div className={`col-span-1 lg:col-span-2 py-6 flex flex-col ${concert.id % 2 === 0 ? 'lg:order-first' : 'lg:order-last'}`}>
                            <h2 className="text-2xl md:text-5xl lg:text-7xl font-medium mb-4">{concert.name}</h2>
                            <span className="text-secondary font-medium text-lg md:text-2xl mb-6">{concert.date}</span>
                            <p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
                                {concert.description}
                            </p>

                            <div className="hidden lg:block space-y-2 mt-6">
                                {concert.tracklist?.map((tracklist) => (
                                    <div 
                                        className="py-2" 
                                        key={tracklist.id}
                                    >
                                        <span className="font-medium">{tracklist.name}</span> - <span className="text-neutral-400">{tracklist.artists}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-3">
                            <div className="sticky top-1/6 self-start">
                                <div className="relative aspect-[16/12]">
                                    <Image 
                                        src={concert.image} 
                                        alt={concert.alt}
                                        fill
                                        className="object-cover w-full"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="lg:hidden space-y-2">
                            {concert.tracklist?.map((tracklist) => (
                                <div 
                                    className="py-2" 
                                    key={tracklist.id}
                                >
                                    <span className="font-medium">{tracklist.name}</span> - <span className="text-neutral-400">{tracklist.artists}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
 
export default Concerts;