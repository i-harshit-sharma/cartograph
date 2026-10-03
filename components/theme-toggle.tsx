"use client";

import { useEffect, useState } from "react";

export type ThemeState = "system" | "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeState>("system");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as ThemeState) || "system";
    setTheme(stored);
  }, []);

  const applyTheme = (mode: ThemeState) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    document.cookie = `theme=${mode}; path=/; max-age=31536000; SameSite=Lax`;

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (mode === "light") {
      root.classList.add("light");
    } else if (mode === "dark") {
      root.classList.add("dark");
    } else {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(isSystemDark ? "dark" : "light");
    }
  };

  return (
    <div className="flex items-center gap-0.5 rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 p-0.5 text-xs font-mono select-none">
      <button
        type="button"
        onClick={() => applyTheme("system")}
        className={`px-2 py-0.5 rounded transition-colors ${
          theme === "system"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium shadow-xs"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
        title="Follow system theme"
      >
        System
      </button>
      <button
        type="button"
        onClick={() => applyTheme("light")}
        className={`px-2 py-0.5 rounded transition-colors ${
          theme === "light"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium shadow-xs"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
        title="Force light theme"
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => applyTheme("dark")}
        className={`px-2 py-0.5 rounded transition-colors ${
          theme === "dark"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium shadow-xs"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
        title="Force dark theme"
      >
        Dark
      </button>
    </div>
  );
}
