"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";
import { usePathname } from "next/navigation";


const Header = () => {

    const router = useTransitionRouter();
    const pathname = usePathname();

    const links = [
        { name: "Artists", href: "/artists" },
        { name: "Our Story", href: "/story" },
    ];

    return (
        <header className="fixed top-0 z-50 w-full h-[72px] backdrop-blur-md bg-background/10 flex flex-row justify-between items-center p-8">
            <Link
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    router.push("/", {
                        onTransitionReady: slideInOut
                    });
                }}
                className={`uppercase font-medium ${pathname === "/" ? "pointer-events-none" : ""}`}
            >
                Maestro
            </Link>
            <nav className="flex flex-row space-x-4">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`uppercase font-medium ${pathname === link.href ? "pointer-events-none" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(link.href, {
                                onTransitionReady: slideInOut
                            });
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
