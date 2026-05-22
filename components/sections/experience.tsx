"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Building2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { sectionContent, sectionHeading, sectionInner } from "@/lib/section-styles";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export function Experience() {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true }) as ExperienceItem[];

  return (
    <section
      id="experience"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
      aria-labelledby="experience-heading"
    >
      <div className={`pt-4 pb-8 sm:pt-6 sm:pb-10 xl:pt-8 xl:pb-12 ${sectionInner}`}>
        <div className={sectionContent}>
        <FadeIn direction="up" className={`space-y-2 ${sectionHeading}`}>
          <p className="font-mono text-xs font-medium tracking-wider text-emerald-600 dark:text-emerald-400">
            {t("experience.subtitle")}
          </p>
          <h2
            id="experience-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
          >
            {t("experience.title")}
          </h2>
        </FadeIn>

        <div className="mt-12 relative">
          <FadeIn delay={0.2} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
            <div className="relative space-y-8 md:space-y-12">
              {/* Vertical Line */}
              <div
                className="absolute top-2 bottom-2 hidden w-px bg-zinc-200 dark:bg-zinc-800 md:block md:left-42"
                aria-hidden="true"
              />

              {Array.isArray(items) && items.map((item, idx) => (
                <FadeIn key={idx} delay={0.3 + idx * 0.1} direction="up">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="group relative grid gap-4 rounded-xl p-2 transition-colors hover:bg-zinc-100/60 md:grid-cols-[140px_1fr_auto] md:items-start md:gap-8 md:p-3 dark:hover:bg-zinc-800/30"
                  >
                    {/* Date column */}
                    <div className="pt-1 text-xs font-semibold text-emerald-600 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-emerald-400 md:pr-8 md:text-sm md:font-medium md:text-right">
                      {item.period}
                    </div>

                    {/* Dot on line */}
                    <div className="absolute top-5 hidden -translate-x-1/2 md:block md:left-42">
                      <div className="h-2.5 w-2.5 rounded-full border-2 border-zinc-200 bg-white transition-all duration-300 group-hover:scale-125 group-hover:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950" />
                    </div>

                    {/* Content column */}
                    <div className="space-y-3 md:space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-50 dark:group-hover:text-emerald-400 md:text-xl">
                          {item.title}
                        </h3>
                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 md:text-sm">
                          {item.company} <span className="mx-1 text-zinc-400">•</span> {item.period}
                        </p>
                      </div>

                      <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 transition-all hover:-translate-y-0.5 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 md:py-1 md:text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Logo column */}
                    <div className="hidden h-24 w-24 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/50 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-lg group-hover:shadow-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900/50 xl:flex">
                      <div className="flex flex-col items-center gap-1 text-zinc-400">
                        <Building2 className={cn(
                          "h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5",
                          idx === 0 ? "text-blue-500" : idx === 1 ? "text-emerald-500" : "text-amber-500"
                        )} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {item.company}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.6} className="mt-16 flex justify-center">
              <Button variant="outline" className="group gap-2 border-emerald-500/50 text-emerald-600 transition-all hover:-translate-y-0.5 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/15 dark:text-emerald-400 dark:hover:bg-emerald-500/20">
                {t("experience.viewFull")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </FadeIn>
          </FadeIn>
        </div>
        </div>
      </div>
    </section>
  );
}
