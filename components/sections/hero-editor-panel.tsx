"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type EditorTab = "about" | "skills" | "experience";

export function HeroEditorPanel({ className }: { className?: string }) {
  const { t } = useTranslation();
  const [active, setActive] = React.useState<EditorTab>("about");

  const TABS: { id: EditorTab; label: string }[] = [
    { id: "about", label: t("home.editor.tabAbout") },
    { id: "skills", label: t("home.editor.tabSkills") },
    { id: "experience", label: t("home.editor.tabExperience") },
  ];

  const SNIPPETS: Record<EditorTab, string> = {
    about: t("home.editor.snippetAbout"),
    skills: t("home.editor.snippetSkills"),
    experience: t("home.editor.snippetExperience"),
  };

  const lines = SNIPPETS[active].split("\n");

  return (
    <div
      className={cn(
        "flex w-full min-h-[280px] min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 shadow-2xl dark:border-zinc-700 sm:min-h-[320px]",
        className
      )}
    >
      <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1 border-b border-zinc-800 bg-zinc-900 px-2 py-2 sm:px-3">
        <div className="flex shrink-0 items-center gap-1.5 pr-1" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
        </div>
        <div
          className="flex min-w-0 flex-1 items-stretch gap-0.5 sm:gap-1"
          role="tablist"
          aria-label="Editor files"
        >
          {TABS.map((tab) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`editor-tab-${tab.id}`}
                aria-controls={`editor-panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "shrink-0 rounded-t px-2 py-1.5 font-mono text-[10px] font-medium transition-colors sm:px-3 sm:text-xs",
                  selected
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "border-b-2 border-transparent text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`editor-panel-${active}`}
        aria-labelledby={`editor-tab-${active}`}
        className="min-h-0 min-w-0 flex-1 overflow-auto"
      >
        <div className="grid grid-cols-[auto_1fr] gap-x-4 p-3 font-mono text-[10px] leading-relaxed sm:p-4 sm:text-xs lg:text-[13px]">
          <div
            className="select-none text-right text-zinc-500"
            aria-hidden
          >
            {lines.map((_, index) => (
              <div key={`ln-${index + 1}`}>{index + 1}</div>
            ))}
          </div>
          <pre className="whitespace-pre text-emerald-400">
            <code>{lines.join("\n")}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
