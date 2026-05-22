"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Download,
  FolderGit,
  FolderKanban,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroEditorPanel } from "@/components/sections/hero-editor-panel";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  PROFILE_IMAGE,
  RESUME_FILENAME,
  RESUME_URL,
} from "@/lib/social-links";
import { FadeIn } from "@/components/ui/fade-in";

export function Home() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Briefcase,
      value: "5+",
      label: t("home.stats.experience"),
    },
    {
      icon: FolderKanban,
      value: "15+",
      label: t("home.stats.projects"),
    },
    {
      icon: Users,
      value: "10+",
      label: t("home.stats.clients"),
    },
    {
      icon: Sparkles,
      value: "100%",
      label: t("home.stats.dedication"),
    },
  ];

  return (
    <section
      id="home"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="grid w-full max-w-screen-2xl justify-items-center gap-8 px-4 pt-8 pb-8 sm:px-6 sm:pt-20 sm:pb-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.28fr)] xl:items-center xl:justify-items-stretch xl:gap-12 xl:px-8 xl:pt-24 xl:pb-12 2xl:gap-16">
        <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center gap-8 text-center xl:mx-0 xl:max-w-none xl:items-start xl:text-left">
          <FadeIn direction="up" delay={0.1} className="flex w-full justify-center xl:justify-start">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t("home.badge")}
            </motion.div>
          </FadeIn>

          <div className="w-full space-y-4">
            <FadeIn delay={0.2} className="w-full">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl xl:text-6xl">
                {t("home.greeting")}{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {t("home.name")}
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} className="w-full">
              <p className="text-base font-medium text-zinc-700 dark:text-zinc-300 sm:text-xl">
                {t("home.role")}
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="w-full">
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base xl:mx-0">
                {t("home.description")}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 xl:justify-start">
              <Button
                asChild
                size="lg"
                className="shrink-0 transition-transform hover:-translate-y-0.5"
              >
                <a href="#projects">{t("home.ctaWork")}</a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15"
                asChild
              >
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FolderGit className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15"
                asChild
              >
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Building2 className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="shrink-0 gap-2 transition-transform hover:-translate-y-0.5"
                asChild
              >
                <a href={RESUME_URL} download={RESUME_FILENAME}>
                  <Download className="h-4 w-4" />
                  {t("home.ctaResume")}
                </a>
              </Button>
            </div>
          </FadeIn>

          <dl className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-none sm:grid-cols-4 sm:gap-4 xl:max-w-2xl">
            {stats.map(({ icon: Icon, value, label }, idx) => (
              <FadeIn
                key={label}
                delay={0.6 + idx * 0.1}
                direction="up"
                className="h-full w-full"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="h-full rounded-xl border border-zinc-200 bg-white/60 p-3 text-left transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-4"
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                    {value}
                  </dd>
                  <dd className="text-[11px] font-medium leading-snug text-zinc-500 dark:text-zinc-400 sm:text-xs">
                    {label}
                  </dd>
                </motion.div>
              </FadeIn>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto flex w-full min-w-0 max-w-2xl flex-col items-stretch xl:mx-0 xl:max-w-none xl:block xl:min-h-[min(28rem,52vh)]">
          <FadeIn
            direction="up"
            delay={0.4}
            className="mb-6 flex w-full shrink-0 justify-center xl:mb-0 xl:hidden"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-emerald-500/60 bg-linear-to-br from-emerald-100 to-white shadow-[0_0_32px_-4px_rgba(16,185,129,0.45)] dark:from-emerald-950 dark:to-zinc-800 dark:shadow-[0_0_32px_-4px_rgba(16,185,129,0.35)] sm:h-44 sm:w-44"
            >
              <Image
                src={PROFILE_IMAGE}
                alt={`${t("home.name")} profile`}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 176px, 208px"
                priority
              />
            </motion.div>
          </FadeIn>

          <div className="relative w-full min-w-0 xl:h-full">
            <FadeIn direction="up" delay={0.6} className="w-full xl:pl-24 2xl:pl-32">
              <motion.div
                className="w-full"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <HeroEditorPanel className="relative z-0 min-h-[min(20rem,45vh)] w-full min-w-0 sm:min-h-[min(22rem,50vh)] xl:min-h-[min(26rem,52vh)]" />
              </motion.div>
            </FadeIn>

            <div className="pointer-events-none absolute left-0 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 xl:block xl:left-12 2xl:left-16">
              <FadeIn direction="right" delay={0.8}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="pointer-events-auto relative h-44 w-44 overflow-hidden rounded-full border-4 border-emerald-500/70 bg-linear-to-br from-emerald-100 to-white shadow-[0_0_0_6px_rgba(255,255,255,0.95),0_0_40px_-6px_rgba(16,185,129,0.55)] dark:from-emerald-950 dark:to-zinc-800 dark:shadow-[0_0_0_6px_rgba(9,9,11,0.95),0_0_40px_-6px_rgba(16,185,129,0.4)] xl:h-52 xl:w-52"
                >
                  <Image
                    src={PROFILE_IMAGE}
                    alt={`${t("home.name")} profile`}
                    fill
                    className="object-cover"
                    sizes="208px"
                    priority
                  />
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
