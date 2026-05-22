"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import {
  Building2,
  FolderGit,
  Globe,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLocale } from "@/components/providers/i18n-provider";
import {
  localeLabels,
  locales,
  type Locale,
} from "@/i18n/settings";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/social-links";
import { cn } from "@/lib/utils";

const navKeys = [
  { href: "#home", key: "nav.home" as const },
  { href: "#about", key: "nav.about" as const },
  { href: "#skills", key: "nav.skills" as const },
  { href: "#experience", key: "nav.experience" as const },
  { href: "#projects", key: "nav.projects" as const },
  { href: "#testimonials", key: "nav.testimonials" as const },
  { href: "#contact", key: "nav.contact" as const },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme, toggle } = useThemeToggle();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0.1, 0.25, 0.4, 0.6],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = navKeys.map((key) => document.getElementById(key.href.substring(1)));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (href: string) => () => {
    setActiveSection(href.slice(1));
    setMobileOpen(false);
  };

  const currentLocale = (locales as readonly string[]).includes(i18n.language)
    ? (i18n.language as Locale)
    : "en";

  return (
    <>
    <header className="sticky top-0 z-50 flex w-full justify-center border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="flex h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
        <Link
          href="#home"
          className="shrink-0 font-mono text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-base"
        >
          {t("header.logo")}
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {navKeys.map(({ href, key }) => {
            const isActive = activeSection === href.substring(1);
            return (
              <Link
                key={key}
                href={href}
                onClick={handleNavClick(href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                )}
              >
                {t(key)}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 -z-10 rounded-md bg-emerald-500/10 dark:bg-emerald-500/20"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FolderGit className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Building2 className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            onClick={toggle}
            aria-label={t("header.toggleTheme")}
            disabled={!mounted}
          >
            {!mounted ? (
              <span className="h-5 w-5" />
            ) : resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden gap-2 sm:inline-flex"
                aria-label="Language"
              >
                <Globe className="h-4 w-4 shrink-0" />
                <span className="max-w-28 truncate">
                  {localeLabels[currentLocale]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuRadioGroup
                value={currentLocale}
                onValueChange={(v) => setLocale(v as Locale)}
              >
                {locales.map((lng) => (
                  <DropdownMenuRadioItem key={lng} value={lng}>
                    {localeLabels[lng]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="sm:hidden"
                aria-label="Language"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuRadioGroup
                value={currentLocale}
                onValueChange={(v) => setLocale(v as Locale)}
              >
                {locales.map((lng) => (
                  <DropdownMenuRadioItem key={lng} value={lng}>
                    {localeLabels[lng]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={toggle}
            aria-label={t("header.toggleTheme")}
            disabled={!mounted}
          >
            {!mounted ? (
              <span className="h-5 w-5" />
            ) : resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t("header.closeMenu") : t("header.openMenu")}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

    </header>

    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          key="mobile-drawer"
          className="fixed inset-0 z-60 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label={t("header.closeMenu")}
            onClick={() => setMobileOpen(false)}
          />

          <motion.aside
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            className="absolute inset-y-0 left-0 flex h-full w-[min(20rem,85vw)] max-w-xs flex-col bg-white shadow-xl dark:bg-zinc-950"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
              <span className="font-mono text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {t("header.logo")}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label={t("header.closeMenu")}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
              {navKeys.map(({ href, key }) => {
                const isActive = activeSection === href.substring(1);
                return (
                  <Link
                    key={key}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    )}
                    onClick={handleNavClick(href)}
                  >
                    {t(key)}
                  </Link>
                );
              })}
            </nav>

            <div className="shrink-0 space-y-3 border-t border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FolderGit className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Building2 className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Globe className="h-4 w-4 shrink-0" />
                      <span className="truncate">{localeLabels[currentLocale]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-40">
                    <DropdownMenuRadioGroup
                      value={currentLocale}
                      onValueChange={(v) => setLocale(v as Locale)}
                    >
                      {locales.map((lng) => (
                        <DropdownMenuRadioItem key={lng} value={lng}>
                          {localeLabels[lng]}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={toggle}
                  aria-label={t("header.toggleTheme")}
                  disabled={!mounted}
                >
                  {!mounted ? (
                    <span className="h-5 w-5" />
                  ) : resolvedTheme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
