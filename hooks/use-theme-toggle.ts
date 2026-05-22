"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

export function useThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return { resolvedTheme, toggle };
}
