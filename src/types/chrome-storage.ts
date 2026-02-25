import type { Theme } from "@src/modules/footer-toolbar/types";
import type { PreviewKeys } from "@src/modules/preview/types";

export enum StorageKeys {
  SETTINGS = "settings",
  THEME = "theme",
  LAST_SELECTED_PREVIEW = "last_selected_preview",
}

export type ChromeStorageThemeValue = Theme;
export type ChromeStorageSettingsValue = string; // Stringified settings object
export type ChromeStorageLastSelectedPreviewValue = PreviewKeys;
export type ChromeStorageValue =
  | ChromeStorageLastSelectedPreviewValue
  | ChromeStorageSettingsValue
  | ChromeStorageThemeValue;
