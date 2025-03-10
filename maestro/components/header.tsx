"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";


const Header = () => {

    const router = useTransitionRouter();

    const links = [
        { name: "Home", href: "/" },
        { name: "Artists", href: "/artists" },
    ];

    return (
        <header className="fixed top-0 w-full h-[72px] flex flex-row justify-between items-center p-8">
            <Link
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    router.push("/", {
                        onTransitionReady: slideInOut
                    });
                }}
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
