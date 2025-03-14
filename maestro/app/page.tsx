"use client";

import Image from "next/image";
// import dynamic from 'next/dynamic';
import InfiniteGallery from "@/components/ui/infinite-gallery";

// import { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import SplitType from "split-type";

// gsap.registerPlugin(SplitType);
// const InfiniteGallery = dynamic(() => import('@/components/ui/infinite-gallery'), { ssr: false });


export default function Home() {
	// const container = useRef(null);
	
	// useGSAP(() => {
	// 	const heroText = new SplitType("h1", { types: "words" });
	// 	gsap.set(heroText.words, { y: 400 });

	// 	gsap.to(heroText.words, {
	// 		y: 0,
	// 		duration: 1,
	// 		stagger: 0.075,
	// 		ease: "power4.out",
	// 		delay: 1
	// 	})
	// },{ scope: container });


	return (
		// <main className="w-screen min-h-screen" ref={container}>
		// 	<div className="w-full flex flex-col pt-[40vh]">
		// 		<div className="grid grid-cols-5 grid-rows-2">
		// 			<div className="col-span-2" />
		// 			{/* <h1 
		// 				className="text-[20vw] font-semibold tracking-[-0.5rem] leading-none [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]"
		// 			>
		// 				Maestro
		// 			</h1> */}
		// 			<div className="col-span-2 row-span-1 h-auto">
		// 				<h1 
		// 					className="text-2xl font-medium leading-relaxed [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]"
		// 				>
		// 					We are a group of artist between the age of 18 and 28, coming from all corners of france. We all have one goal in common- reinventing music to continue to make it live.
		// 				</h1>
		// 			</div>
		// 		</div>
		// 		<div className="col-span-1" />
		// 		<Image 
		// 			src={"/images/group.webp"} 
		// 			alt="Maestro group shot of first concert" 
		// 			width={1920} 
		// 			height={1080} 
		// 			className="w-full aspect-[16/9] object-cover object-center" 
		// 		/>
		// 	</div>
		// </main>
		<main className="min-h-screen pt-[72px]">
			 <section className="px-4 md:px-8 py-6 md:py-12">
				<h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium">La Musique Réinventée</h1>
			</section>

			<section className="flex flex-col md:flex-row px-4 md:px-8 lg:px-16 py-8">
				<div className="md:w-3/4 relative rounded-lg aspect-[16/12]">
					<Image 
						src="/images/group2.webp" 
						alt="Groupe de musiciens Maestro" 
						fill
						className="object-cover"
					/>
				</div>
				<div className="md:w-1/2 md:pl-8 py-6">
					<p className="text-base leading-loose mb-6">
						Nous sommes une troupe d&apos;artistes, réunis par une passion commune : repousser les limites de la scène musicale. Nous jouons à un, à deux, à trois... jusqu&apos;à neuf sur scène. Entre compositions, improvisations et interactions avec le public, chaque spectacle est une expérience unique.
					</p>
				</div>
			</section>
			
			<section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 py-8">
				<div className="col-span-1">
					<p className="text-base leading-loose">
						L&apos;idée de créer cette troupe est née il y a plusieurs mois, avant d&apos;aboutir, il y a environ un an. Tout est parti d&apos;échanges avec d&apos;autres musiciens. Certains viennent d&apos;écoles de musique, d&apos;autres proviennent du conservatoire, d&apos;autres des genres et même autodidacte.
					</p>
				</div>
				
				<div className="col-span-1">
					<p className="text-base leading-loose">
						At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
					</p>
				</div>
			</section>

			<section className="py-16 md:py-64 px-4 md:px-8 lg:px-16 text-center">
				<h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-20 sm:mb-24 md:mb-32">Maestro, c&apos;est...</h2>
				
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
						<p className="text-6xl lg:text-[80px] font-medium">17</p>
						<p className="text-2xl md:text-3xl lg:text-[40px] mt-2 font-medium text-secondary">artistes</p>
					</div>
				</div>
			</section>

			<section className="px-4 md:px-8 py-6 md:py-12">
				<h2 className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6">Titre ici</h2>
				<p className="max-w-3xl text-base leading-loose">
					At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.
				</p>
			</section>

			<InfiniteGallery />
		</main>
	);
}