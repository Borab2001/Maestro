"use client";

// import { Carousel } from "@/components/ui/carousel"
import homeData from "@/data/home.json";
import { TextEffect } from "@/components/ui/text-effect";
import ImageReveal from "@/components/ui/image-reveal";
import ImageGallery from "@/components/ui/image-gallery";


export default function Home() {
	return (
		<main className="min-h-screen pt-[72px]">
			{/* <section className="px-4 md:px-8 py-6 md:py-12">
				<TextEffect
					per="char"
					preset="fade-in-blur"
					as="h1"
					className="text-3xl md:text-6xl xl:text-[80px] font-medium leading-tight"
					delay={0}
					speedReveal={2}
					useInViewTrigger
				>
					{homeData.hero.title}
				</TextEffect>
			</section>

			<section className="flex flex-col md:flex-row px-4 md:px-8 lg:px-16 py-8">
				<ImageReveal
					src={homeData.hero.image.src}
					alt={homeData.hero.image.alt}
					className="md:w-3/4 aspect-[16/12]"
					duration={1}
					delay={0}
					ease=""
				/>
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
			</section> */}
			<section className="min-h-auto lg:min-h-screen flex flex-col">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-8 items-end px-4 md:px-8 py-6 md:py-12 lg:pt-24">
					<TextEffect
						per="char"
						preset="fade-in-blur"
						as="h1"
						className="text-3xl xs:text-5xl md:text-6xl lg:text-8xl font-medium leading-tight"
						delay={0}
						speedReveal={1.2}
						useInViewTrigger
					>
						{homeData.hero.title}
					</TextEffect>
					<TextEffect
						per="word"
						preset="slide"
						as="p"
						className="h-auto font-medium text-base leading-loose"
						delay={0.6}
						speedReveal={6}
						useInViewTrigger
					>
						{homeData.hero.description}
					</TextEffect>
				</div>

				<ImageReveal
					src={homeData.hero.image.src}
					alt={homeData.hero.image.alt}
					className="w-full aspect-[3/2] md:aspect-[16/9]"
					animationType="fade-translate-parallax"
					duration={0.6}
					delay={1.5}
					ease={"easeInOut"}
				/>
				{/* <div className="absolute h-full inset-0 -z-10">
					<ImageReveal
						src={homeData.hero.image.src}
						alt={homeData.hero.image.alt}
						className="w-full h-full object-cover"
						duration={1}
						delay={0}
						ease=""
					/>
					<div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
				</div> */}
			</section>
			
			<section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 py-8">
				{homeData.about.paragraphs.map((paragraph, index) => (
					<div key={index} className="col-span-1">
						<TextEffect
							per="line"
							preset="slide"
							as="p"
							className="font-medium text-base leading-loose mb-6"
							delay={0.3}
							speedReveal={0.2}
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

			{/* <Carousel
				images={homeData.carousel.images}
				autoplayDelay={2000}
				showPagination={true}
				showNavigation={true}
			/> */}
			<ImageGallery 
				images={homeData.gallery.images}
				containerHeight="h-[700px] xs:h-[1000px] sm:h-[1200px] md:h-[280px] lg:h-[400px] xl:h-[600px] 2xl:h-[700px]" 
				imageSize="w-full md:w-56 h-56 xs:h-[450px] sm:h-[500px] md:h-[280px] lg:h-[400px] xl:h-[600px] 2xl:h-[700px]"
			/>
		</main>
	);
}