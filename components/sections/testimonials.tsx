"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { sectionContent, sectionHeading, sectionInner } from "@/lib/section-styles";

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export function Testimonials() {
  const { t } = useTranslation();
  const items =
    (t("testimonials.items", { returnObjects: true }) as TestimonialItem[]) || [];

  return (
    <section
      id="testimonials"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
      aria-labelledby="testimonials-heading"
    >
      <div className={`relative overflow-hidden py-8 xl:py-20 ${sectionInner}`}>
        <motion.div
          className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-12 bottom-10 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <div className={sectionContent}>
          <FadeIn direction="up" className={`space-y-2 ${sectionHeading}`}>
            <p className="font-mono text-xs font-medium tracking-wider text-emerald-600 dark:text-emerald-400">
              {t("testimonials.subtitle")}
            </p>
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
            >
              {t("testimonials.title")}
            </h2>
          </FadeIn>

          <div className="mt-10 grid justify-items-center gap-6 sm:max-w-lg sm:grid-cols-1 md:mx-auto md:max-w-2xl md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
            {items.map((item, idx) => (
              <FadeIn
                key={`${item.name}-${item.company}`}
                delay={0.1 + idx * 0.1}
                direction="up"
                className="h-full w-full max-w-md md:max-w-none"
              >
                <motion.div
                  className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                >
                  <motion.div
                    className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  />

                  <div className="flex items-center justify-between">
                    <motion.div
                      animate={{ rotate: [0, -6, 0], y: [0, -1, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Quote
                        className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                        aria-hidden
                      />
                    </motion.div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    &quot;{item.quote}&quot;
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      {item.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part.charAt(0))
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.role} · {item.company}
                      </p>
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
