import { useEffect, useState } from "react";
import {
  getFromChromeStorage,
  saveToChromeStorage,
} from "@src/utils/chrome-storage";
import {
  StorageKeys,
  type ChromeStorageThemeValue,
} from "@src/types/chrome-storage";
import type { Theme } from "@src/modules/footer-toolbar/types";

export const useThemeSwitch = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>("dark");

  const applyThemeToDocument = (theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    (async () => {
      const storedTheme = await getFromChromeStorage<ChromeStorageThemeValue>(
        StorageKeys.THEME,
      );
      if (storedTheme && ["light", "dark"].includes(storedTheme)) {
        setActiveTheme(storedTheme);
        applyThemeToDocument(storedTheme);
      }
    })();
  }, []);

  const toggleTheme = () => {
    setActiveTheme((t) => {
      const newTheme = t === "light" ? "dark" : "light";

      saveToChromeStorage(StorageKeys.THEME, newTheme);
      applyThemeToDocument(newTheme);
      return newTheme;
    });
  };

  return { activeTheme, toggleTheme };
};
