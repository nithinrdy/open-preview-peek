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
import { SettingsContext } from "./context";

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    (async () => {
      const stringifiedSettings =
        await getFromChromeStorage<ChromeStorageSettingsValue>(
          StorageKeys.SETTINGS,
        );
      const parsedSettings = stringifiedSettings
        ? tryJsonParse<Settings>(stringifiedSettings)
        : null;

      setSettings((prev) => ({ ...prev, ...parsedSettings }));
    })();
  }, []);

  const updateSettings = (newSettings: Settings) => {
    setSettings((prev) => {
      const updatedSettings = { ...prev, ...newSettings };
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
