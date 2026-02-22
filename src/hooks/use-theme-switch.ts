import { useEffect, useState } from "react";
import {
  getFromChromeStorage,
  saveToChromeStorage,
} from "@src/utils/chrome-storage";

export const useThemeSwitch = () => {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("dark");

  const applyThemeToDocument = (theme: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    (async () => {
      const storedTheme = (await getFromChromeStorage("theme")) as
        | "light"
        | "dark"
        | null;
      if (storedTheme && ["light", "dark"].includes(storedTheme)) {
        setActiveTheme(storedTheme);
        applyThemeToDocument(storedTheme);
      }
    })();
  }, []);

  const toggleTheme = () => {
    setActiveTheme((t) => {
      const newTheme = t === "light" ? "dark" : "light";

      saveToChromeStorage("theme", newTheme);
      applyThemeToDocument(newTheme);
      return newTheme;
    });
  };

  return { activeTheme, toggleTheme };
};
