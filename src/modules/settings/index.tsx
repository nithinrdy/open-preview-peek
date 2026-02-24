import { useContext } from "react";

import { SettingsContext } from "@src/providers/settings";

export const Settings = () => {
  const { settingsPanelOpen, settings, updateSettings } =
    useContext(SettingsContext);

  return (
    <div
      className={
        "absolute h-full w-full flex justify-center items-center p-4 z-[10] transition-all duration-500 " +
        (settingsPanelOpen
          ? "backdrop-blur-[10px] bg-settings-panel-background"
          : "pointer-events-none opacity-0")
      }
    >
      <div className="flex flex-col gap-2 w-3/4">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="rememberLastSelectedPreview"
            className="font-[700] text-content-primary text-xl select-none"
          >
            Remember last selected preview
          </label>
          <div className="bg-content-secondary opacity-30 h-0.5 grow" />
          <input
            id="rememberLastSelectedPreview"
            className="h-5 w-5"
            type="checkbox"
            checked={settings.rememberLastSelectedPreview}
            onChange={(e) =>
              updateSettings({ rememberLastSelectedPreview: e.target.checked })
            }
          />
        </div>
      </div>
    </div>
  );
};
