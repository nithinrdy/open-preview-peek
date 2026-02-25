import { useContext } from "react";

import { SettingsContext } from "@src/providers/settings";
import { CheckboxSettingsItem } from "./components/checkbox-item";
import { DEFAULT_SETTINGS, HOTKEY_GUIDE, SETTINGS_ITEMS } from "./constants";

export const Settings = () => {
  const { settingsPanelOpen, settings, updateSettings } =
    useContext(SettingsContext);

  const hotkeysEnabled =
    settings?.enableHotkeys ?? DEFAULT_SETTINGS.enableHotkeys;

  return (
    <div
      className={
        "absolute h-full w-full flex justify-center p-4 z-[10] transition-all duration-500 " +
        (settingsPanelOpen
          ? "backdrop-blur-[10px] bg-settings-panel-background"
          : "pointer-events-none opacity-0")
      }
    >
      <div className="flex flex-col items-center gap-4 w-3/4 mt-8">
        <span className="font-rajdhani font-[600] text-content-primary text-2xl select-none mb-8">
          Settings
        </span>
        {SETTINGS_ITEMS.map(({ id, label }) => (
          <CheckboxSettingsItem
            key={id}
            settingId={id}
            settingLabel={label}
            checked={settings?.[id] ?? DEFAULT_SETTINGS[id]}
            onChange={(checked) => updateSettings({ [id]: checked })}
            disabled={!settingsPanelOpen} // so these checkboxes don't get tabbed-through while the settings panel is closed and invisible
          />
        ))}

        <div
          className="w-4/5 flex flex-col items-center gap-2 mt-4 transition-opacity"
          style={{ opacity: hotkeysEnabled ? 1 : 0.2 }}
        >
          {HOTKEY_GUIDE.map(({ action, hotkey }) => (
            <div className="w-full flex items-center justify-between gap-4 font-rajdhani text-content-primary text-lg select-none">
              <span>{action}</span>
              <div className="bg-content-secondary opacity-30 h-0.5 grow" />
              <span>{hotkey}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
