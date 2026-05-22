"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  FolderGit,
  Building2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/social-links";
import { FadeIn } from "@/components/ui/fade-in";
import { sectionContent, sectionHeading, sectionInner } from "@/lib/section-styles";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
      aria-labelledby="contact-heading"
    >
      <div className={`py-8 xl:py-20 ${sectionInner}`}>
        <div className={`grid gap-8 xl:grid-cols-[1fr_1.5fr_1fr] xl:gap-12 ${sectionContent}`}>
          {/* Left Column: Contact Info */}
          <FadeIn direction="up" className={`space-y-8 ${sectionHeading}`}>
            <div>
              <p className="font-mono text-xs font-medium tracking-wider text-emerald-600 dark:text-emerald-400">
                {t("contact.subtitle")}
              </p>
              <h2
                id="contact-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
              >
                {t("contact.title")}
              </h2>
            </div>

            <div className="flex flex-col items-center space-y-4 xl:items-start">
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <a href={`mailto:${t("contact.email")}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.email")}
                </a>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
                <a href={`tel:${t("contact.phone").replace(/\s/g, "")}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.phone")}
                </a>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>{t("contact.location")}</span>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <FolderGit className="h-5 w-5" />
                </div>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.github")}
                </a>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.linkedin")}
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Middle Column: Contact Form */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group/form relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
            >
            <motion.div
              className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <form className="relative space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder={t("contact.form.name")} className="bg-zinc-50/50 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900" />
                <Input type="email" placeholder={t("contact.form.email")} className="bg-zinc-50/50 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900" />
              </div>
              <Textarea
                placeholder={t("contact.form.message")}
                className="min-h-[150px] bg-zinc-50/50 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              />
              <div className="flex justify-center">
                <Button className="gap-2 bg-emerald-600 transition-all duration-300 group-hover/form:shadow-lg group-hover/form:shadow-emerald-500/20 hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                  {t("contact.form.send")}
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover/form:translate-x-0.5 group-hover/form:-translate-y-0.5" />
                </Button>
              </div>
            </form>
            </motion.div>
          </FadeIn>

          {/* Right Column: Terminal Panel */}
          <FadeIn direction="up" delay={0.4} className="hidden xl:block">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 font-mono text-sm transition-colors hover:border-emerald-500/35 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2">
                <p className="text-emerald-600 dark:text-emerald-400">{">_"}</p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <span className="text-purple-600 dark:text-purple-400">const</span> message = <span className="text-emerald-600 dark:text-emerald-400">&quot;{t("contact.terminal.message")}&quot;</span>;
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <span className="text-blue-600 dark:text-blue-400">console</span>.<span className="text-yellow-600 dark:text-yellow-400">log</span>(message);
                </p>
                <p className="mt-4 text-zinc-500 dark:text-zinc-500">
                  {t("contact.terminal.message")}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
