"use client";

import Link from "next/link";

type HeroContentProps = {
  myName: string;
  resumeZh: string;
  resumeEn: string;
  email: string;
  phone: string;
};

export default function HeroContent({
  myName,
  resumeZh,
  resumeEn,
  email,
  phone,
}: HeroContentProps) {
  return (
    <section className="relative z-20 min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:items-center">
        <div>
          <div className="text-sm font-medium text-emerald-300">Welcome</div>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
            {myName}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
            A game-focused portfolio with cinematic atmosphere, clean information hierarchy,
            and data-driven project sections for easy long-term updates.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={resumeZh}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Resume in Chinese
            </Link>
            <Link
              href={resumeEn}
              className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/95 transition hover:border-white/30"
            >
              Resume in English
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-white/65">Say Hello</div>
              <div className="mt-1 text-xl font-semibold">Let&apos;s talk</div>
            </div>
            <div className="text-xs text-white/55">Contact</div>
          </div>

          <div className="mt-5 space-y-3">
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 transition hover:border-white/30"
            >
              <span className="text-sm font-medium text-white/90">Email</span>
              <span className="text-sm text-white/80">{email}</span>
            </a>

            <a
              href={`tel:${phone.replaceAll(" ", "")}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 transition hover:border-white/30"
            >
              <span className="text-sm font-medium text-white/90">Phone</span>
              <span className="text-sm text-white/80">{phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

