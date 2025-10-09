import Link from "next/link";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    const socials = [
        {
            name: 'Instagram',
            username: "@maestro.concerts",
            link: 'https://www.instagram.com/maestro.concerts/',
        },
        {
            name: 'TikTok',
            username: "@maestro.concerts",
            link: 'https://www.tiktok.com/@maestro.concerts',
        },
    ]

    return (
        <footer className="w-full flex flex-col pt-6 md:pt-12 lg:pt-24">
            <div className="">
                <div className="flex flex-col items-end">
                    <div className="w-full lg:w-2/3 px-4">
                        <span className="text-secondary text-sm md:text-base capitalize">
                            &#169; {currentYear} Maestro
                        </span>
                        <p className="text-3xl md:text-6xl lg:text-[80px] py-8 border-b border-secondary">Suivez-nous</p>
                        <div className="flex flex-row space-x-8 pt-8">
                            {socials.map((link, index) => (
                                <div key={index} className="flex flex-col items-start gap-2 md:gap-4">
                                    <span className="text-foreground text-lg md:text-xl capitalize font-medium">
                                        {link.name}
                                    </span>
                                    <Link
                                        key={index}
                                        href={link.link}
                                        className="text-secondary font-medium text-base md:text-lg"
                                    >
                                        {link.username}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden h-[27vw] w-full">
                <span className="text-foreground text-[30vw] absolute -left-[4vw] w-auto">
                    Maestro
                </span>
            </div>
        </footer>
    );
};

export default Footer;
