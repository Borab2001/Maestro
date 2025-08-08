"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/carousel"
import homeData from "@/data/home.json";


export default function Home() {
	return (
		<main className="min-h-screen pt-[72px]">
			<section className="px-4 md:px-8 py-6 md:py-12">
				<h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{homeData.hero.title}</h1>
			</section>

			<section className="flex flex-col md:flex-row px-4 md:px-8 lg:px-16 py-8">
				<div className="md:w-3/4 relative rounded-lg aspect-[16/12]">
					<Image 
						src={homeData.hero.image.src} 
						alt={homeData.hero.image.alt} 
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
				{homeData.about.paragraphs.map((paragraph, index) => (
					<div key={index} className="col-span-1">
						<p className="text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{paragraph}</p>
					</div>
				))}
			</section>

			<section className="py-16 md:py-64 px-4 md:px-8 lg:px-16 text-center">
				<h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-20 sm:mb-24 md:mb-32 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{homeData.stats.title}</h2>
				
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-8">
					{homeData.stats.items.map((stat, index) => (
						<div key={index}>
							<p className="text-6xl lg:text-[80px] font-medium">{stat.number}</p>
							<p className="text-2xl md:text-3xl lg:text-[40px] mt-2 font-medium text-secondary">{stat.label}</p>
						</div>
					))}
				</div>
			</section>

			<section className="px-4 md:px-8 py-6 md:py-12">
				<h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">
					{homeData.future.title}
				</h2>
				{/* <p className="max-w-4xl text-base leading-loose [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]">{homeData.future.description}</p> */}
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

			<Carousel
				images={homeData.carousel.images}
				autoplayDelay={2000}
				showPagination={true}
				showNavigation={true}
			/>
		</main>
	);
}