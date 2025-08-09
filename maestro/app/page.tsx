"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/carousel"
import homeData from "@/data/home.json";
import { TextEffect } from "@/components/ui/text-effect";


export default function Home() {
	return (
		<main className="min-h-screen pt-[72px]">
			<section className="px-4 md:px-8 py-6 md:py-12">
				<TextEffect
					per="char"
					preset="fade-in-blur"
					as="h1"
					className="text-3xl md:text-6xl xl:text-[80px] font-medium leading-tight"
					delay={2}
					speedReveal={2}
					useInViewTrigger
				>
					{homeData.hero.title}
				</TextEffect>
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
					<TextEffect
                        per="word"
                        preset="slide"
                        as="p"
                        className="font-medium text-base leading-loose mb-6"
                        delay={2}
                        speedReveal={6}
                        useInViewTrigger
                    >
                        {homeData.hero.description}
                    </TextEffect>
				</div>
			</section>
			
			<section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 py-8">
				{homeData.about.paragraphs.map((paragraph, index) => (
					<div key={index} className="col-span-1">
						<TextEffect
							per="word"
							preset="slide"
							as="p"
							className="font-medium text-base leading-loose mb-6"
							delay={2}
							speedReveal={6}
							useInViewTrigger
						>
							{paragraph}
						</TextEffect>
					</div>
				))}
			</section>

			<section className="py-16 md:py-64 px-4 md:px-8 lg:px-16 text-center">
				<TextEffect
                    per="char"
                    preset="fade-in-blur"
                    as="h2"
                    className="text-3xl md:text-6xl lg:text-7xl font-medium mb-20 sm:mb-24 md:mb-32 leading-tight"
                    delay={0.3}
                    speedReveal={2}
                    useInViewTrigger
                >
					{homeData.stats.title}
				</TextEffect>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-8">
					{homeData.stats.items.map((stat, index) => (
						<div key={index}>
							<TextEffect
								per="line"
								preset="fade-in-blur"
								as="p"
								className="text-6xl lg:text-[80px] font-medium"
								delay={0.3}
								speedReveal={0.2}
								useInViewTrigger
							>
								{stat.number}
							</TextEffect>
							<TextEffect
								per="line"
								preset="fade-in-blur"
								as="p"
								className="text-2xl md:text-3xl lg:text-[40px] mt-2 font-medium text-secondary"
								delay={0.3}
								speedReveal={0.2}
								useInViewTrigger
							>
								{stat.label}
							</TextEffect>
						</div>
					))}
				</div>
			</section>

			<section className="px-4 md:px-8 py-6 md:py-12">
				<TextEffect
                    per="char"
                    preset="fade-in-blur"
                    as="h2"
                    className="text-3xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight"
                    delay={0.3}
                    speedReveal={2}
                    useInViewTrigger
                >
					{homeData.future.title}
				</TextEffect>

				<div className="max-w-4xl text-base leading-loose font-medium">
					{homeData.future.description.split('\n\n').map((paragraph, index) => (
						<p key={index}>
							<TextEffect
								per="line"
								preset="fade-in-blur"
								as="span"
								className=""
								delay={0.3}
								speedReveal={0.2}
								useInViewTrigger
							>
								{paragraph}
							</TextEffect>
							
							{index < homeData.future.description.split('\n\n').length - 1 && (
								<>
									<br />
									<br />
								</>
							)}
						</p>
					))}
				</div>
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