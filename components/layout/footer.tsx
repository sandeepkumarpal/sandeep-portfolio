"use client";

import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex w-full justify-center border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="w-full max-w-screen-2xl px-4 py-8 sm:px-6 xl:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <div className="font-mono text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-base">
            {t("header.logo")}
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("footer.copyright")}
          </p>

          {/* Built With & Scroll Top */}
          <div className="flex items-center gap-6">
            <p className="hidden text-sm text-zinc-500 dark:text-zinc-400 xl:block">
              {t("footer.builtWith")}
            </p>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-emerald-500/20 bg-emerald-500/5 text-emerald-600 hover:bg-emerald-500/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
              onClick={scrollToTop}
              aria-label={t("footer.scrollTop")}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
