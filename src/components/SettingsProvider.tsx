"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, type Content, type Lang } from "@/lib/i18n";

export type Theme = "light" | "dark";

type SettingsContextValue = {
  theme: Theme;
  lang: Lang;
  t: Content;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function storedValue(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function saveValue(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable in private mode.
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("id");
  const [ready, setReady] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = storedValue("fissa-theme");
    const savedLang = storedValue("fissa-lang");
    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : root.dataset.theme === "dark"
          ? "dark"
          : "light";

    setThemeState(initialTheme);
    setLangState(savedLang === "en" ? "en" : "id");
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    saveValue("fissa-theme", theme);
  }, [theme, ready]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang;
    saveValue("fissa-lang", lang);
  }, [lang, ready]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
    [],
  );
  const toggleLang = useCallback(
    () => setLangState((current) => (current === "id" ? "en" : "id")),
    [],
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      theme,
      lang,
      t: content[lang],
      setTheme,
      toggleTheme,
      setLang,
      toggleLang,
    }),
    [theme, lang, setTheme, toggleTheme, setLang, toggleLang],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
