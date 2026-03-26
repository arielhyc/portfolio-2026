"use client";

import { useEffect, useRef } from "react";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
};

export default function VideoBackground({ src, poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Some videos may not respect autoplay+muted reliably across browsers.
    // Force mute and zero volume after mount.
    v.muted = true;
    v.volume = 0;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        volume={0}
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Dark readable overlay */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-neutral-950/90" />
    </div>
  );
}

