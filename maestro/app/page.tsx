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
						{homeData.hero.description}
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
					{homeData.future.description.split('\n\n').map((paragraph, index) => (
						<span key={index}>
							{paragraph}
							{index < homeData.future.description.split('\n\n').length - 1 && (
								<>
									<br />
									<br />
								</>
							)}
						</span>
					))}
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