import type { Settings } from "@src/types/settings";

export const SETTINGS_ITEMS: {
  id: keyof Settings;
  label: string;
}[] = [
  {
    id: "rememberLastSelectedPreview",
    label: "Remember last selected preview",
  },
  {
    id: "enableHotkeys",
    label: "Enable hotkeys",
  },
];

export const DEFAULT_SETTINGS: Settings = {
  rememberLastSelectedPreview: true,
  enableHotkeys: true,
};

export const HOTKEY_GUIDE = [
  {
    action: "Next Preview",
    hotkey: "Shift + Right",
  },
  {
    action: "Previous Preview",
    hotkey: "Shift + Left",
  },
  {
    action: "Toggle Theme",
    hotkey: "Shift + Down",
  },
  {
    action: "Toggle Settings Panel",
    hotkey: "Shift + Up",
  },
];
