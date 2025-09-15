"use client";

import Image from 'next/image';
import React from 'react';

const VinylAlbum = ({ 
  coverUrl = "/images/group2.webp",
  isOpen = true,
  size = "normal",
  isSpinning = false
}) => {

  const sizeClasses = size === "small" 
    ? "w-[200px] h-[200px]" 
    : "w-[300px] h-[300px]";
  
  const vinylSize = size === "small" 
    ? "w-[180px] h-[180px]" 
    : "w-[280px] h-[280px]";

//   const marginClass = size === "small" 
//     ? "mx-[70px]" 
//     : "mx-[100px]";

  const coverTransform = size === "small"
    ? (isOpen ? "-translate-x-[7.5px]" : "")
    : (isOpen ? "-translate-x-[10px]" : "");

  const vinylTransform = size === "small"
    ? (isOpen ? "translate-x-1/2" : "translate-x-0")
    : (isOpen ? "translate-x-1/2" : "translate-x-0");

  const vinylCoverSize = size === "small"
    ? "w-[66px] h-[66px]"
    : "w-[100px] h-[100px]";

  return (
    <div className={`relative ${sizeClasses} my-4`}>
      {/* Album Cover */}
      <div 
        className={`
          relative w-full h-full rounded-[3px] overflow-hidden z-20
          shadow-[0_8px_16px_rgba(0,0,0,0.3)]
          transition-transform duration-500 ease-in-out
          ${coverTransform}
        `}
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
          transition-transform duration-1000 ease-in-out
          ${vinylTransform}
          ${isOpen ? "animate-[spin_2s_linear_infinite]" : ""}
          bg-black
        `}
        style={{
          animationPlayState: isSpinning ? 'running' : 'paused',
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