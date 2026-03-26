"use client";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
};

export default function VideoBackground({ src, poster }: VideoBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
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

