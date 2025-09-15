"use client";

import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface PlayButtonProps {
	isPlaying: boolean;
	onClick: () => void;
}

const PlayButton = ({ isPlaying, onClick }: PlayButtonProps) => {
	return (
		<motion.div
			onClick={onClick}
			className="cursor-pointer relative flex items-center justify-center"
		>
			<div className="w-12 h-12 rounded-full border border-white/40 transition-colors duration-200 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center">
				<motion.div
					initial={false}
					animate={{ rotate: isPlaying ? 0 : 0 }}
					transition={{ duration: 0.2 }}
				>
					{isPlaying ? (
						<Pause size={16} className="text-white fill-current" />
					) : (
						<Play size={16} className="text-white fill-current" />
					)}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default PlayButton;