"use client";

import Image from 'next/image';
import React, { useState } from 'react';

const VinylAlbum = ({ 
  coverUrl = "https://images.genius.com/078ea5adb4c3da9b438bd15d5659a094.1000x1000x1.jpg",
  isOpen = true,
  size = "normal" // "normal" or "small"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = size === "small" 
    ? "w-[150px] h-[150px]" 
    : "w-[300px] h-[300px]";
  
  const vinylSize = size === "small" 
    ? "w-[130px] h-[130px]" 
    : "w-[280px] h-[280px]";

  const marginClass = size === "small" 
    ? "mx-[70px]" 
    : "mx-[100px]";

  const coverTransform = size === "small"
    ? (isOpen || isHovered ? "-translate-x-[5px] -rotate-1" : "")
    : (isOpen || isHovered ? "-translate-x-[10px] -rotate-2" : "");

  const vinylTransform = size === "small"
    ? (isOpen || isHovered ? "translate-x-1/2 rotate-[360deg]" : "translate-x-0 rotate-[270deg]")
    : (isOpen || isHovered ? "translate-x-1/2 rotate-[360deg]" : "translate-x-0 rotate-[270deg]");

  const vinylCoverSize = size === "small"
    ? "w-[46px] h-[46px]"
    : "w-[100px] h-[100px]";

  return (
    <div className={`relative ${sizeClasses} ${marginClass} my-4`}>
      {/* Album Cover */}
      <div 
        className={`
          relative w-full h-full rounded-[3px] overflow-hidden z-20
          shadow-[0_8px_16px_rgba(0,0,0,0.3)]
          transition-transform duration-500 ease-in-out
          ${coverTransform}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          fill
          src={coverUrl} 
          alt="Album Cover"
          className="w-full h-full object-cover"
        />
        
        {/* Top highlight */}
        <div className="
          absolute top-0 left-0 w-full h-[10%] z-30 pointer-events-none
          bg-gradient-to-b from-white/40 via-transparent to-transparent
        " />
        
        {/* Complex overlay effects */}
        <div className="
          absolute top-0 left-0 w-full h-full z-30 pointer-events-none
          bg-gradient-to-t from-black/50 via-transparent to-transparent
        " style={{
          background: `
            linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 4%),
            linear-gradient(225deg, 
              rgba(162, 162, 162, 0.1) 0%, 
              rgba(162, 162, 162, 0.2) 4%,
              rgba(255, 255, 255, 0.2) 6%,
              rgba(255, 255, 255, 0.6) 7%,
              rgba(255, 255, 255, 0.2) 7%,
              rgba(218, 218, 218, 0.04) 7%,
              transparent 6%),
            linear-gradient(45deg, 
              rgba(14, 14, 14, 0.7),
              rgba(0, 0, 0, 0.5) 0%, 
              rgba(0, 0, 0, 0.2) 4%,
              rgba(14, 14, 14, 0.2) 6%,
              rgba(255, 255, 255, 0.3) 7%,
              rgba(218, 218, 218, 0.4) 7%,
              transparent 8%)
          `
        }} />
      </div>

      {/* Vinyl Record */}
      <div 
        className={`
          absolute top-[10px] right-0 ${vinylSize} rounded-full z-10
          flex justify-center items-center
          shadow-[0_0_15px_rgba(0,0,0,0.5)]
          transition-transform duration-500 ease-in-out
          ${vinylTransform}
          bg-black
        `}
        style={{
          background: `
            conic-gradient(from 50deg at 50% 50%, 
              transparent 46%, 
              rgba(255, 255, 255, 0.1) 48%, 
              rgba(255, 255, 255, 0.15) 51%, 
              transparent 56%),
            conic-gradient(from 225deg at 50% 50%, 
              transparent 46%, 
              rgba(255, 255, 255, 0.1) 48%, 
              rgba(255, 255, 255, 0.15) 51%, 
              transparent 56%),
            repeating-radial-gradient(circle, 
              rgba(120, 120, 120, 0.1) 0%, 
              rgba(192, 192, 192, 0.01) 1px, 
              transparent 1px, 
              transparent 4px),
            black
          `
        }}
      >
        {/* Vinyl Center */}
        <div 
          className={`${vinylCoverSize} bg-cover bg-center rounded-full`}
          style={{
            backgroundImage: `url(${coverUrl})`,
            boxShadow: '0 0 0 5px black'
          }}
        />
      </div>
    </div>
  );
};

export default VinylAlbum;