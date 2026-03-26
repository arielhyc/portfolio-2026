import Link from "next/link";

type DemoProject = {
  title: string;
  teamLine?: string;
  paragraphs: string[];
  youtubeUrl?: string; // TODO: You will manually fill this in later.
  itchUrl?: string; // TODO: You will manually fill this in later.
  downloadUrl?: string;
};

const myName = "Yichun He";

const nav = [
  { label: "Main", href: "/" },
  { label: "Game Demos", href: "/game-demos" },
  { label: "Game Demos 2", href: "/game-demos-2" },
  { label: "About Me", href: "/about" },
  { label: "More", href: "/more" },
];

// Content based on the Wix "Game Demos" page (Where Is My Head).
// YouTube/itch.io fields are intentionally left blank for you to configure manually.
const demos: DemoProject[] = [
  {
    title: "Where Is My Head",
    teamLine: "Team Member: Jin Zhou, Tianzuo Peng, Yichun He",
    paragraphs: [
      "This is a puzzle game developed in Global Game Jam 2021, players will play as a robot, who find that their head is not on the body every morning. Players can only see and control the body from the perspective of the head. When the body touches the head, the head will return to the body. In addition, the bigger conspiracy is not far away.",
      "After several daily levels, players will find the real reason for the head falling.",
    ],
    youtubeUrl: "https://youtu.be/LaVJZmNlqrM",
    downloadUrl:
      "https://drive.google.com/file/d/1g1-uuJGtyBYFmjFvH4ne80MsEKc5KS9G/view?usp=sharing",
  },
];

function toYoutubeEmbedUrl(url: string) {
  // Supports: https://www.youtube.com/watch?v=xxxx or youtu.be/xxxx
  const watchMatch = url.match(/[?&]v=([^&]+)/i);
  if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
}

function YoutubePreview({ youtubeUrl }: { youtubeUrl: string }) {
  const embed = toYoutubeEmbedUrl(youtubeUrl);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {/* Use explicit height because Tailwind's aspect utilities may not exist in this build. */}
      <div className="relative w-full h-72 md:h-80">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embed}
          title="YouTube preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function PreviewLinkCard({
  title,
  href,
  subtitle,
}: {
  title: string;
  href: string;
  subtitle?: string;
}) {
  const shortHost = (() => {
    try {
      const u = new URL(href);
      return u.host.replace(/^www\./, "");
    } catch {
      return href;
    }
  })();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/20 hover:bg-black/30"
    >
      <div className="min-w-0">
        <div className="text-sm font-medium text-white/85">{title}</div>
        <div className="mt-0.5 text-xs text-white/60">
          {subtitle ?? shortHost}
        </div>
      </div>
      <div className="shrink-0 text-xs text-emerald-300 group-hover:text-emerald-200">
        Open →
      </div>
    </a>
  );
}

function DemoProjectCard({ project }: { project: DemoProject }) {
  return (
    <article className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="text-sm font-medium text-white/60">Game Demo</div>
        <h2 className="mt-2 text-2xl font-semibold leading-tight">{project.title}</h2>
        {project.teamLine ? (
          <div className="mt-2 text-sm text-white/70">{project.teamLine}</div>
        ) : null}

        <div className="mt-4 space-y-3">
          {project.paragraphs.map((p, idx) => (
            <p key={idx} className="text-sm leading-7 text-white/70">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {project.itchUrl ? (
            <PreviewLinkCard title="itch.io" href={project.itchUrl} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-medium text-white/85">itch.io Link</div>
              <div className="mt-2 text-xs text-white/60">
                TODO: add itchUrl in `app/game-demos/page.tsx`.
              </div>
            </div>
          )}

          {project.downloadUrl ? (
            <PreviewLinkCard
              title="Download Game"
              href={project.downloadUrl}
              subtitle="Google Drive"
            />
          ) : null}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        {project.youtubeUrl ? (
          <YoutubePreview youtubeUrl={project.youtubeUrl} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-medium text-white/85">YouTube Preview</div>
            <div className="mt-2 text-xs text-white/60">
              TODO: add youtubeUrl in `app/game-demos/page.tsx`.
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function GameDemosPage() {
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
        <section className="flex flex-col gap-3">
          <div className="text-sm font-medium text-emerald-300">
            Game Demos
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Selected playable prototypes
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/70">
            Configure and explore demo projects with video previews, readable descriptions,
            and itch.io links.
          </p>
        </section>

        <section className="mt-10 space-y-6">
          {demos.map((d) => (
            <DemoProjectCard key={d.title} project={d} />
          ))}
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

