"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FolderGit, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { sectionContent, sectionHeading, sectionInner } from "@/lib/section-styles";

interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  github: string;
  external: string;
  image: string;
  color: "emerald" | "blue" | "purple";
}

export function Projects() {
  const { t } = useTranslation();

  const projects = (t("projects.items", { returnObjects: true }) as ProjectItem[]) || [];

  const colorVariants = {
    emerald: "border-emerald-500/20 hover:border-emerald-500/40 before:bg-emerald-500/50",
    blue: "border-blue-500/20 hover:border-blue-500/40 before:bg-blue-500/50",
    purple: "border-purple-500/20 hover:border-purple-500/40 before:bg-purple-500/50",
  };

  const glowVariants = {
    emerald: "bg-emerald-500/5",
    blue: "bg-blue-500/5",
    purple: "bg-purple-500/5",
  };

  return (
    <section
      id="projects"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
      aria-labelledby="projects-heading"
    >
      <div className={`pt-8 pb-8 sm:pt-10 sm:pb-20 xl:pt-12 xl:pb-24 ${sectionInner}`}>
        <div className={sectionContent}>
        <FadeIn direction="up" className={`mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between xl:text-left ${sectionHeading}`}>
          <div>
            <p className="font-mono text-xs font-medium tracking-wider text-emerald-600 dark:text-emerald-400">
              {t("projects.subtitle")}
            </p>
            <h2
              id="projects-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
            >
              {t("projects.title")}
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-1 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            {t("projects.viewAll")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </FadeIn>

        <div className="grid justify-items-center gap-6 xl:grid-cols-3">
          {projects.map((project, idx) => (
            <FadeIn
              key={idx}
              delay={0.2 + idx * 0.1}
              direction="up"
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-white p-4 transition-all duration-300 dark:bg-zinc-950",
                "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:opacity-0 before:transition-opacity hover:before:opacity-100",
                colorVariants[project.color]
              )}
            >
              <motion.div
                className="flex h-full w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row xl:flex-col 2xl:flex-row"
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                {/* Project Image/Preview */}
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 sm:w-32 xl:w-full 2xl:w-32">
                  <div className={cn(
                    "absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30",
                    glowVariants[project.color]
                  )} />
                  <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <div className={cn(
                      "h-4/5 w-4/5 rounded-lg border border-zinc-200/50 bg-white/50 shadow-xl dark:border-zinc-800/50 dark:bg-zinc-950/50",
                      "flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:rotate-2"
                    )}>
                       <span className="text-2xl font-bold opacity-10">{project.title[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="text-lg font-bold text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-50 dark:group-hover:text-emerald-400">
                    {project.title}
                  </h3>
                  
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] font-medium text-zinc-500 transition-all hover:-translate-y-0.5 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-all hover:-translate-y-0.5 hover:text-zinc-900 dark:hover:text-zinc-50"
                      aria-label={`${project.title} GitHub`}
                    >
                      <FolderGit className="h-4 w-4" />
                    </a>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-zinc-900 dark:hover:text-zinc-50"
                      aria-label={`${project.title} Live Demo`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
