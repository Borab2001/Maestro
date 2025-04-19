"use client";

import {
    MorphingPopover,
    MorphingPopoverContent,
    MorphingPopoverTrigger,
} from '@/components/ui/morphing-popover';

import { motion } from 'motion/react';
  
type TracklistProps = {
    tracklist?: Array<{
        id?: number;
        name?: string;
        artists: string;
    }>;
}

export function Tracklist({ tracklist }: TracklistProps) {
    return (
      <MorphingPopover>
        <MorphingPopoverTrigger asChild>
          <button className='h-9 p-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-neutral-800 bg-background hover:bg-accent hover:text-accent-foreground'>
            <motion.span
              layoutId='morphing-popover-basic-label'
              layout='position'
            >
              Tracklist
            </motion.span>
          </button>
        </MorphingPopoverTrigger>
        <MorphingPopoverContent className='z-100 w-[400px] h-[400px] left-0 top-0 overflow-x-hidden overflow-y-auto'>
          <div className='grid gap-3'>
            <div className='space-y-2'>
              <motion.h4
                layoutId='morphing-popover-basic-label'
                layout='position'
                className='leading-none font-medium'
              >
                Tracklist
              </motion.h4>
              <p className='text-muted-foreground text-sm text-secondary'>
                Les morceaux joués lors de ce concert.
              </p>
            </div>
            <div className='grid gap-2'>
				<div className="grid gap-4">
					{tracklist?.map((tracklist) => (
						<div 
							className="" 
							key={tracklist.id}
						>
							{tracklist.name} - {tracklist.artists}
						</div>
					))}
				</div>
            </div>
          </div>
        </MorphingPopoverContent>
      </MorphingPopover>
    );
}