"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";


const Header = () => {

    const router = useTransitionRouter();

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

    function slideInOut() {
        document.documentElement.animate(
            [
                { 
                    opacity: 1,
                    transform: "translateY(0)"
                },
                {
                    opacity: 0.2,
                    transform: "translateY(-35%)"
                }
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            },
        );

        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
                },
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }

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
                            router.push(`${link.href}`, {
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
}
 
export default Header;