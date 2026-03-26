"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type NavItem = { label: string; href: string };
type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

const nav: NavItem[] = [
  { label: "Main", href: "/" },
  { label: "Game Demos", href: "/game-demos" },
  { label: "Game Demos 2", href: "/game-demos-2" },
  { label: "About Me", href: "/about" },
  { label: "More", href: "/more" },
];

const myName = "Yichun He"; // TODO: Replace with your name
const resumes = {
  zh: "/resumes/resume-cn.pdf", // TODO: Replace with your actual path/URL
  en: "/resumes/resume-en.pdf", // TODO: Replace with your actual path/URL
};

const gameDemos: Project[] = [
  {
    title: "Demo Project 1",
    description: "A short pitch focusing on gameplay feel and technical highlights.",
    tags: ["Unity", "Gameplay", "Systems"],
    // Per requirement: clicking Demo Project 1 "View" goes to the Game Demos page.
    href: "/game-demos",
  },
  {
    title: "Demo Project 2",
    description: "Turn-based combat prototype with readable UI and tuned pacing.",
    tags: ["Prototype", "UI", "Iteration"],
    href: "/projects/demo-2",
  },
];

const artworks: Project[] = [
  {
    title: "Artwork 1",
    description: "A piece showcasing atmosphere, composition, and style consistency.",
    tags: ["Illustration", "Environment", "Color"],
    href: "/artworks/art-1",
  },
  {
    title: "Artwork 2",
    description: "A character/prop concept with clear silhouette and material logic.",
    tags: ["Concept", "Character", "Design"],
    href: "/artworks/art-2",
  },
];

const contact = {
  email: "he.your-email@example.com", // TODO: Replace
  phone: "+1 (000) 000-0000", // TODO: Replace
};

const barData = [
  { label: "Gameplay", value: 12 },
  { label: "UI/UX", value: 8 },
  { label: "Tools", value: 6 },
  { label: "Art", value: 10 },
  { label: "Tech", value: 9 },
];

function BarChartModule() {
  // Render nothing on the server, and also on the client's first render.
  // This prevents hydration mismatch caused by Recharts internal measurement/id.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <div className="text-sm text-white/60">Bar Chart</div>
          <div className="text-lg font-semibold text-white">
            Highlights at a glance
          </div>
        </div>
        <div className="text-xs text-white/50">Responsive • Recharts</div>
      </div>

      <div
        className="min-h-0 min-w-0 h-72 w-full"
        style={{ minWidth: 0, minHeight: 0 }}
      >
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="label"
                tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,10,10,0.9)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "rgba(255,255,255,0.9)" }}
              />
              <Bar
                dataKey="value"
                fill="rgba(34,197,94,0.9)"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </div>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <div
          key={p.title}
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold text-white">{p.title}</div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                {p.description}
              </div>
            </div>
            {p.href ? (
              <Link
                href={p.href}
                className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/80 transition group-hover:border-white/20"
              >
                View
              </Link>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-white/90"
          >
            {myName}
          </Link>

          <nav className="flex items-center gap-2 overflow-x-auto">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-sm font-medium text-emerald-300">
              Welcome
            </div>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
              {myName}
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/70">
              A game-focused portfolio with data-driven project sections and a clean, premium layout.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={resumes.zh}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Resume in Chinese
              </Link>
              <Link
                href={resumes.en}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/20"
              >
                Resume in English
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-white/60">Say Hello</div>
                <div className="mt-1 text-xl font-semibold">Let’s talk</div>
              </div>
              <div className="text-xs text-white/50">Contact</div>
            </div>

            <div className="mt-5 space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/20"
              >
                <span className="text-sm font-medium text-white/85">Email</span>
                <span className="text-sm text-white/70">{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replaceAll(" ", "")}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/20"
              >
                <span className="text-sm font-medium text-white/85">Phone</span>
                <span className="text-sm text-white/70">{contact.phone}</span>
              </a>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4">
              <div className="text-xs text-white/60">Focus</div>
              <div className="mt-1 text-sm text-white/80">
                Gameplay systems, UI craft, and production-friendly tooling.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-white/60">
                Game Demos
              </div>
              <div className="mt-1 text-xl font-semibold">
                Selected playable prototypes
              </div>
            </div>
          </div>
          <ProjectGrid items={gameDemos} />
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-white/60">
                Artworks
              </div>
              <div className="mt-1 text-xl font-semibold">
                Visual design & environment pieces
              </div>
            </div>
          </div>
          <ProjectGrid items={artworks} />
        </section>

        <section className="mt-10">
          <BarChartModule />
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/50">
          © {new Date().getFullYear()} by {myName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
