"use client";

import Image from "next/image";
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

	interface ImageItem {
		src: string;
		alt: string;
	}

	const images: ImageItem[] = [
        { src: '/images/group.webp', alt: 'Performance Maestro 1' },
        { src: '/images/group.webp', alt: 'Performance Maestro 2' },
        { src: '/images/group.webp', alt: 'Performance Maestro 3' },
        { src: '/images/group.webp', alt: 'Performance Maestro 4' },
        { src: '/images/group.webp', alt: 'Performance Maestro 5' },
    ];

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
					Nous sommes la première troupe de pianistes en France et nous avons entre 18 et 28 ans.
					Le piano est souvent perçu comme un art solitaire, mais nous le transformons en expérience collective.
					Notre concept ? Mélanger nos parcours – conservatoire, gares ou autodidacte – et proposer un format inédit
					où la mise en scène et l’univers visuel sont aussi puissants que la musique. Le piano peut être un vrai spectacle vivant.
					</p>
				</div>
			</section>
			
			<section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 py-8">
				<div className="col-span-1">
					<p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
						Nos concerts mélangent musiques de film, pop, classiques et compositions personnelles. Chaque performance est pensée pour
						raconter une histoire à la fois musicale et visuelle à travers un voyage émotionnel. Nous improvisons, interagissons avec
						le public, et créons des ponts entre les styles pour créer un format hybride qui mêle le meilleur de la scène et des gares.
						C&apos;est en construisant avec une liberté totale que ce projet est devenu réalité.
					</p>
				</div>
				
				<div className="col-span-1">
					<p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
						Certains d&apos;entre nous sont très suivis sur les réseaux sociaux, mais, n&apos;étant pas issus d&apos;un parcours traditionnel,
						ils ressentent parfois un manque de légitimité à l&apos;idée de monter sur scène. Pourtant, leur talent est indéniable.
						Nous voulons montrer qu&apos;il est possible de passer des réseaux sociaux aux grandes scènes, du virtuel au réel,
						montrant une unité artistique et humaine, venant des quatre coins de la France, qui donne toute sa force à notre projet.
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
				<h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
					L&apos;avenir du Projet
				</h2>
				<p className="max-w-4xl text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
					Grâce à notre travail collectif, nous avons donné nos premiers concerts cette année, et les retours nous encouragent d&apos;autant plus à continuer.
					Mais l&apos;histoire ne fait que commencer. En plus de nos concerts, nous rêvons de nous diversifier, de créer notre propre musique,
					de fusionner les arts, de multiplier les collaborations, de créer des ponts entre les styles musicaux.
					<br />
					<br />
					Nous voulons repousser les limites et prouver qu&apos;un instrument classique peut porter des messages forts et actuels.
					Nous aimerions aussi étendre notre présence au-delà de Paris, jouer dans des villes où la musique résonne différemment et
					faire découvrir notre univers à un public de plus en plus large, tout en restant fidèles à ce qui nous fait vibrer.
				</p>
			</section>
		</main>
	);
}