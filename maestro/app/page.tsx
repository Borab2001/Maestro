"use client";

import Image from "next/image";
import InfiniteGallery from "@/components/ui/infinite-gallery";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(SplitType, ScrollTrigger);

export default function Home() {
	const container = useRef(null);

	useGSAP(() => {
		const title = new SplitType("h1", { types: "chars" });
		const subtitle = new SplitType("h2", { types: "chars" });
		const text = new SplitType("p", { types: "lines", tagName: "div", lineClass: "line" });

		if (title.chars) {
			title.chars.forEach((char) => {
				const content = char.innerHTML;
				char.innerHTML = `<span className="relative will-change-transform">${content}</span>`;
			});

			gsap.set(title.chars, { 
				y: 100 
			});
			gsap.to(title.chars, { 
				y: 0, 
				duration: 0.75, 
                stagger: 0.075, 
                ease: "power4.out", 
                delay: 0.25 
            });
		}

		if (subtitle.chars) {
			subtitle.chars.forEach((char) => {
				const content = char.innerHTML;
				char.innerHTML = `<span className="relative will-change-transform">${content}</span>`;
			});
			
			gsap.set(subtitle.chars, { 
				y: 100,
			});

			document.querySelectorAll("h2").forEach(subtitle => {
				const chars = subtitle.querySelectorAll(".char");
				
				gsap.to(chars, { 
					y: 0, 
					duration: 1, 
					stagger: 0.075, 
					ease: "power4.out",
					scrollTrigger: {
						trigger: subtitle,
						start: "top 80%"
					}
				});
			});
		}


		if (text.lines) {
			text.lines.forEach((line) => {
				const content = line.innerHTML;
				line.innerHTML = `<span className="relative will-change-transform">${content}</span>`;
			});

			gsap.set(".line span", { 
				y: 100,
                display: "block" 
			});
			
			document.querySelectorAll("p").forEach(paragraph => {
				const lines = paragraph.querySelectorAll(".line span");
                
				gsap.to(lines, { 
                    y: 0, 
                    duration: 1.5, 
                    stagger: 0.075, 
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: paragraph,
                        start: "top 80%",    // Animation commence quand le haut du paragraphe atteint 80% de la hauteur de la fenêtre
                    }
                });
            });
		}

        // Animation des statistiques
        gsap.from(".grid > div", {
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".grid",
                start: "top 80%"
            }
        });

        return () => {
            if (title) title.revert();
			if (subtitle) subtitle.revert();
            if (text) text.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, { scope: container });

	return (
		<main className="min-h-screen pt-[72px]" ref={container}>
			<section className="px-4 md:px-8 py-6 md:py-12">
				<h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">La Musique Réinventée</h1>
			</section>

			<section className="flex flex-col md:flex-row px-4 md:px-8 lg:px-16 py-8">
				<div className="md:w-3/4 relative rounded-lg aspect-[16/12]">
					<Image 
						src="/images/group2.webp" 
						alt="Groupe de musiciens Maestro" 
						fill
						className="object-cover"
						priority
					/>
				</div>
				<div className="md:w-1/2 md:pl-8 py-6">
					<p className="text-base leading-loose mb-6 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
						Nous sommes une troupe d&apos;artistes, réunis par une passion commune : repousser les limites de la scène musicale. Nous jouons à un, à deux, à trois... jusqu&apos;à neuf sur scène. Entre compositions, improvisations et interactions avec le public, chaque spectacle est une expérience unique.
					</p>
				</div>
			</section>
			
			<section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 py-8">
				<div className="col-span-1">
					<p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
						L&apos;idée de créer cette troupe est née il y a plusieurs mois, avant d&apos;aboutir, il y a environ un an. Tout est parti d&apos;échanges avec d&apos;autres musiciens. Certains viennent d&apos;écoles de musique, d&apos;autres proviennent du conservatoire, d&apos;autres des genres et même autodidacte.
					</p>
				</div>
				
				<div className="col-span-1">
					<p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
						At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
					</p>
				</div>
			</section>

			<section className="py-16 md:py-64 px-4 md:px-8 lg:px-16 text-center">
				<h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-20 sm:mb-24 md:mb-32 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">Maestro, c&apos;est...</h2>
				
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-8">
					<div>
						<p className="text-6xl lg:text-[80px] font-medium">2</p>
						<p className="text-2xl md:text-3xl lg:text-[40px] mt-2 font-medium text-secondary">concerts</p>
					</div>
					<div>
						<p className="text-6xl lg:text-[80px] font-medium">500</p>
						<p className="text-2xl md:text-3xl lg:text-[40px] mt-2 font-medium text-secondary">places vendues</p>
					</div>
					<div>
						<p className="text-6xl lg:text-[80px] font-medium">20</p>
						<p className="text-2xl md:text-3xl lg:text-[40px] mt-2 font-medium text-secondary">artistes</p>
					</div>
				</div>
			</section>

			<section className="px-4 md:px-8 py-6 md:py-12">
				<h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">Titre ici</h2>
				<p className="max-w-3xl text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
					At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.
				</p>
			</section>

			<InfiniteGallery />
		</main>
	);
}