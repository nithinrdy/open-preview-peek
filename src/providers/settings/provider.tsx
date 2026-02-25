import { useEffect, useState } from "react";

import type { Settings } from "@src/types/settings";
import {
  getFromChromeStorage,
  saveToChromeStorage,
} from "@src/utils/chrome-storage";
import { tryJsonParse } from "@src/utils/try-json-parse";
import {
  StorageKeys,
  type ChromeStorageSettingsValue,
} from "@src/types/chrome-storage";
import { DEFAULT_SETTINGS } from "@src/modules/settings/constants";
import { SettingsContext } from "./context";

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    (async () => {
      const stringifiedSettings =
        await getFromChromeStorage<ChromeStorageSettingsValue>(
          StorageKeys.SETTINGS,
        );
      const parsedSettings = stringifiedSettings
        ? tryJsonParse<Settings>(stringifiedSettings)
        : null;

      setSettings((prev) => ({
        ...DEFAULT_SETTINGS,
        ...prev,
        ...parsedSettings,
      }));
    })();
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updatedSettings = { ...DEFAULT_SETTINGS, ...prev, ...newSettings };
      saveToChromeStorage(
        StorageKeys.SETTINGS,
        JSON.stringify(updatedSettings),
      );
      return updatedSettings;
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settingsPanelOpen,
        setSettingsPanelOpen,
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider };
