"use client";

export function BackgroundVideo() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-20 select-none">
      {/* 4K Cinematic Monochrome Horizon Image */}
      <img
        src="/background.jpg"
        alt="Meridian Flow"
        className="absolute inset-0 w-full h-full object-cover transform scale-[1.02] filter brightness-[0.75] contrast-[1.1] translate-z-0 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* Cinematic Glass Tint & Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.85) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.8) 100%)
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

