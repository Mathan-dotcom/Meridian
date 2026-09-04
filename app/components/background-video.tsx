"use client";

import { useEffect, useRef } from "react";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85; // Smooth cinematic pace
      videoRef.current.play().catch(() => {
        // Handle autoplay policy silently if needed
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-20 select-none">
      {/* 4K Torii Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transform scale-[1.02] filter brightness-90 contrast-[1.05] translate-z-0 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <source src="/torii.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Glass Tint & Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%)
          `
        }}
      />

      {/* Subtle Ambient Scanline / Texture Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />
    </div>
  );
}
