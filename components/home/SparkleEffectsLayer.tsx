"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

function isLowPerformanceDevice() {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return coarse || reduced || window.innerWidth < 768;
}

export default function SparkleEffectsLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lowPerf = isLowPerformanceDevice();
    const particles: Particle[] = [];
    let raf = 0;
    let lastTrailAt = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnBurst = (x: number, y: number) => {
      const count = lowPerf ? 12 : 24;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (lowPerf ? 1.5 : 2.4) + Math.random() * 2.4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 28 + Math.random() * 24,
          size: 1.3 + Math.random() * 2.2,
          hue: 42 + Math.random() * 28,
        });
      }
    };

    const spawnTrail = (x: number, y: number) => {
      if (lowPerf) return;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -0.2 - Math.random() * 0.6,
        life: 0,
        maxLife: 16 + Math.random() * 12,
        size: 0.8 + Math.random() * 1.3,
        hue: 46 + Math.random() * 20,
      });
    };

    const onClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTrailAt < 26) return;
      lastTrailAt = now;
      spawnTrail(e.clientX, e.clientY);
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += 1;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.vx *= 0.995;
        p.vy *= 0.995;

        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = `hsla(${p.hue} 100% 72% / ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMove);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-30" aria-hidden="true" />;
}

