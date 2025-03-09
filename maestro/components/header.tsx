import Link from "next/link";

const Header = () => {

    const links = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Artists",
            href: "/artists"
        }
    ];

    return (
        <header className="w-full h-[72px] flex flex-row justify-between items-center p-8">
            <Link
                href="/"
                className="uppercase font-medium"
            >
                Maestro
            </Link>
            <nav className="flex flex-row space-x-4">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="uppercase font-medium"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
 
export default Header;