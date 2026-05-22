"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { sectionContent, sectionHeading, sectionInner } from "@/lib/section-styles";

const SKILLS = [
  {
    name: "React",
    icon: (
      <svg
        viewBox="-11.5 -10.23174 23 20.46348"
        className="h-full w-full"
        aria-hidden
      >
        <circle r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" fill="none" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    color: "text-[#61DAFB]",
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.732 20.124l-7.732-10.124v8h-1v-10h1l7.732 10.124v-8h1v10h-1z" />
      </svg>
    ),
    color: "text-zinc-900 dark:text-zinc-50",
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 128 128" className="h-full w-full" aria-hidden>
        <rect width="128" height="128" rx="12" fill="#3178C6" />
        <text
          x="118"
          y="102"
          fill="#FFFFFF"
          fontFamily="Segoe UI, Arial, Helvetica, sans-serif"
          fontSize="58"
          fontWeight="700"
          textAnchor="end"
        >
          TS
        </text>
      </svg>
    ),
    color: "text-[#3178C6]",
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
    color: "text-[#06B6D4]",
  },
  {
    name: "JavaScript",
    icon: (
      <svg viewBox="0 0 128 128" className="h-full w-full" aria-hidden>
        <rect width="128" height="128" fill="#F7DF1E" />
        <text
          x="118"
          y="102"
          fill="#000000"
          fontFamily="Segoe UI, Arial, Helvetica, sans-serif"
          fontSize="58"
          fontWeight="700"
          textAnchor="end"
        >
          JS
        </text>
      </svg>
    ),
    color: "text-[#F7DF1E]",
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm8.392 16.8L12 21.6 3.608 16.8V7.2L12 2.4l8.392 4.8v9.6zM12 5.4L6.6 8.4v7.2l5.4 3 5.4-3V8.4L12 5.4zm-1.2 9.6l-3-1.8v-2.4l3 1.8v2.4zm4.2-2.4l-3 1.8V12l3-1.8v2.4z" />
      </svg>
    ),
    color: "text-[#339933]",
  },
  {
    name: "Express.js",
    icon: (
      <div className="flex items-center justify-center font-bold text-2xl">ex</div>
    ),
    color: "text-zinc-600 dark:text-zinc-400",
  },
  {
    name: "MongoDB",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M17.193 9.555c-1.134-4.503-4.488-7.779-4.488-7.779s-.317-.317-.705-.317c-.387 0-.705.317-.705.317s-3.354 3.276-4.488 7.779c-1.507 5.991 1.938 11.095 4.488 13.109.259.201.518.317.705.317.187 0 .446-.116.705-.317 2.55-2.014 5.995-7.118 4.488-13.109zm-5.193 11.235v-16.79c0-.053.014-.106.042-.15.028-.044.071-.077.121-.094.05-.017.104-.017.154 0 .05.017.093.05.121.094.028.044.042.097.042.15v16.79c0 .053-.014.106-.042.15-.028.044-.071.077-.121.094-.05.017-.104.017-.154 0-.05-.017-.093-.05-.121-.094-.028-.044-.042-.097-.042-.15z" />
      </svg>
    ),
    color: "text-[#47A248]",
  },
  {
    name: "Redux",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M15.83 1.18c-1.39 0-2.52 1.13-2.52 2.52 0 1.39 1.13 2.52 2.52 2.52s2.52-1.13 2.52-2.52c0-1.39-1.13-2.52-2.52-2.52zm-7.66 2.66c-1.39 0-2.52 1.13-2.52 2.52 0 1.39 1.13 2.52 2.52 2.52s2.52-1.13 2.52-2.52c0-1.39-1.13-2.52-2.52-2.52zm11.66 5.66c-1.39 0-2.52 1.13-2.52 2.52 0 1.39 1.13 2.52 2.52 2.52s2.52-1.13 2.52-2.52c0-1.39-1.13-2.52-2.52-2.52zm-15.66 2.66c-1.39 0-2.52 1.13-2.52 2.52 0 1.39 1.13 2.52 2.52 2.52s2.52-1.13 2.52-2.52c0-1.39-1.13-2.52-2.52-2.52zm11.66 5.66c-1.39 0-2.52 1.13-2.52 2.52 0 1.39 1.13 2.52 2.52 2.52s2.52-1.13 2.52-2.52c0-1.39-1.13-2.52-2.52-2.52zm-7.66 2.66c-1.39 0-2.52 1.13-2.52 2.52 0 1.39 1.13 2.52 2.52 2.52s2.52-1.13 2.52-2.52c0-1.39-1.13-2.52-2.52-2.52z" />
      </svg>
    ),
    color: "text-[#764ABC]",
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    color: "text-zinc-900 dark:text-zinc-100",
  },
];

export function Skills() {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
      aria-labelledby="skills-heading"
    >
      <div className={`pt-4 pb-8 sm:pt-10 sm:pb-10 xl:pt-12 xl:pb-12 ${sectionInner}`}>
        <div className={sectionContent}>
          <FadeIn direction="up" className={`space-y-2 ${sectionHeading}`}>
            <p className="font-mono text-xs font-medium tracking-wider text-emerald-600 dark:text-emerald-400">
              {t("skillsSection.subtitle")}
            </p>
            <h2
              id="skills-heading"
              className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
            >
              {t("skillsSection.title")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12 relative flex overflow-hidden py-4">
            <div className="flex animate-marquee gap-8 w-max">
              {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map((skill, idx) => (
                <div
                  key={idx}
                  className="flex shrink-0 flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-500/50 w-32 sm:w-40"
                >
                  <div className={cn("h-10 w-10 sm:h-12 sm:w-12", skill.color)}>
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Gradient Overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-zinc-50 dark:from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-zinc-50 dark:from-black to-transparent z-10" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
