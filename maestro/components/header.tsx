"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/slide-in-out";
import { usePathname } from "next/navigation";


const Header = () => {

    const router = useTransitionRouter();
    const pathname = usePathname();

    const links = [
        { name: "Artistes", href: "/artists" },
        { name: "Concerts", href: "/concerts" },
    ];

    return (
        <header className="fixed top-0 z-50 w-full h-[72px] px-4 md:p-8 text-base flex flex-row justify-between items-center">
            <Link
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    router.push("/", {
                        onTransitionReady: slideInOut
                    });
                }}
                className={`capitalize font-medium ${pathname === "/" ? "pointer-events-none" : ""}`}
            >
                Maestro
            </Link>
            <nav className="flex flex-row space-x-8">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`capitalize font-medium ${pathname === link.href ? "pointer-events-none" : ""}`}
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
