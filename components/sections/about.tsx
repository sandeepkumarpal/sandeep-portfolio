"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  User,
  Code,
  Briefcase,
  Mail,
  CheckCircle2,
  Target,
  Layout,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { sectionContent, sectionInner } from "@/lib/section-styles";

export function About() {
  const { t } = useTranslation();

  const sidebarIcons = [
    { icon: User, active: true },
    { icon: Code, active: false },
    { icon: Briefcase, active: false },
    { icon: Mail, active: false },
  ];

  const driveIcons: Record<string, typeof Code> = {
    Code: Code,
    Target: Target,
    Layout: Layout,
    Shield: Shield,
  };

  return (
    <section
      id="about"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
      aria-labelledby="about-heading"
    >
      <div className={`pt-4 pb-8 sm:pt-10 sm:pb-10 xl:pt-12 xl:pb-12 ${sectionInner}`}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          className={`w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 ${sectionContent}`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="flex flex-row items-center justify-center gap-4 border-b border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 md:w-20 md:flex-col md:border-b-0 md:border-r md:py-8">
              {sidebarIcons.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105",
                    item.active
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 sm:p-8 xl:p-12">
              <div className="grid gap-12 xl:grid-cols-2 xl:gap-16">
                {/* Left Column: Who I am */}
                <FadeIn direction="up" className="space-y-6 text-center xl:text-left">
                  <div>
                    <p className="font-mono text-xs font-medium tracking-wider text-emerald-600 dark:text-emerald-400">
                      {t("about.subtitle")}
                    </p>
                    <h2
                      id="about-heading"
                      className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
                    >
                      {t("about.title")}
                    </h2>
                  </div>

                  <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t("about.description")}
                  </p>

                  <ul className="mx-auto max-w-md space-y-3 xl:mx-0 xl:max-w-none" role="list">
                    {Array.isArray(t("about.points", { returnObjects: true })) &&
                      (t("about.points", { returnObjects: true }) as string[]).map(
                        (point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 rounded-md transition-transform duration-300 hover:translate-x-1"
                          >
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                            <span className="text-zinc-700 dark:text-zinc-300">
                              {point}
                            </span>
                          </li>
                        )
                      )}
                  </ul>
                </FadeIn>

                {/* Right Column: What drives me */}
                <FadeIn
                  direction="up"
                  className="rounded-xl border border-zinc-100 bg-zinc-50/30 p-6 text-center transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/30 sm:p-8 xl:text-left"
                >
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {t("about.drivesTitle")}
                  </h3>
                  <div className="mt-8 space-y-6">
                    {Array.isArray(t("about.drives", { returnObjects: true })) &&
                      (
                        t("about.drives", { returnObjects: true }) as {
                          title: string;
                          icon: string;
                        }[]
                      ).map((item, idx) => {
                        const Icon = driveIcons[item.icon] || Code;
                        return (
                          <div
                            key={idx}
                            className="group/item flex items-center gap-4 rounded-md transition-transform duration-300 hover:translate-x-1"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                              <Icon className="h-5 w-5" />
                            </div>
                            <p className="font-medium text-zinc-700 dark:text-zinc-300">
                              {item.title}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
