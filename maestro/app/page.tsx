import Image from "next/image";

export default function Home() {
	return (
		<main className="w-screen min-h-screen">
			<div className="w-full flex flex-col pt-[40vh]">
				<div className="grid grid-cols-5 grid-rows-2">
					<div className="col-span-2" />
					{/* <h1 
						className="text-[20vw] font-semibold tracking-[-0.5rem] leading-none [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]"
					>
						Maestro
					</h1> */}
					<div className="col-span-2 row-span-1 h-auto">
						<h1 
							className="text-2xl font-medium leading-relaxed [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]"
						>
							We are a group of artist between the age of 18 and 28, coming from all corners of france. We all have one goal in common- reinventing music to continue to make it live.
						</h1>
					</div>
				</div>
				<div className="col-span-1" />
				<Image 
					src={"/images/group.webp"} 
					alt="Maestro group shot of first concert" 
					width={1920} 
					height={1080} 
					className="w-full aspect-[16/9] object-cover object-center" />
			</div>
		</main>
	);
}