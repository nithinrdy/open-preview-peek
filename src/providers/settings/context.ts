import { createContext, type Dispatch, type SetStateAction } from "react";

import type { Settings } from "@src/types/settings";

export const SettingsContext = createContext<{
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: Dispatch<SetStateAction<boolean>>;
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}>({
  settingsPanelOpen: false,
  setSettingsPanelOpen: () => {},
  settings: {},
  updateSettings: () => {},
});
