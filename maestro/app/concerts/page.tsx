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
            
            {/* <hr className="border-t border-neutral-200" /> */}

            {concerts.map((concert) => (
                <section 
                    className={`flex flex-col ${concert.id % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} py-16 gap-8`} 
                    key={concert.name}
                >
                    <div className="md:w-1/2 py-6 flex flex-col">
                        <h2 className="text-2xl md:text-5xl lg:text-7xl font-medium mb-4">{concert.name}</h2>
                        <span className="text-secondary font-medium text-lg md:text-2xl mb-6">{concert.date}</span>
                        <p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
                            {concert.description}
                        </p>
                    </div>
                    <div className="md:w-2/3 relative rounded-lg aspect-[16/12]">
                        <Image 
                            src={concert.image} 
                            alt={concert.alt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </section>
            ))}
        </div>
    );
}
 
export default Concerts;