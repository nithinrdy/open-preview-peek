import { createContext, type Dispatch, type SetStateAction } from "react";

import type { Settings } from "@src/types/settings";

export const SettingsContext = createContext<{
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: Dispatch<SetStateAction<boolean>>;
  settings: Settings | null;
  updateSettings: (newSettings: Partial<Settings>) => void;
}>({
  settingsPanelOpen: false,
  setSettingsPanelOpen: () => {},
  settings: null,
  updateSettings: () => {},
});
