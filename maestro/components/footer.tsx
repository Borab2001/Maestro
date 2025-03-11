import Link from "next/link";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    const socials = [
        {
            name: 'Instagram',
            link: '/',
        },
        {
            name: 'TikTok',
            link: '/',
        },
    ]

    return (
        <footer className="w-full h-[72px] backdrop-blur-md bg-background/10 flex flex-row justify-between items-center p-8">
            <Link
                href="/"
                target="_blank"
                className="uppercase font-medium text-sm"
            >
                &#169; {currentYear} Maestro
            </Link>
            <div className="flex flex-row space-x-4">
                {socials.map((link, index) => (
                    <Link
                        key={index}
                        href={link.link}
                        className="uppercase font-medium text-sm"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
