import { useContext } from "react";

import { GearIcon } from "@src/icons/gear";
import { CloseIcon } from "@src/icons/close";

import { IconButton } from "@src/components/icon-button";
import { SettingsContext } from "@src/providers/settings";
import { useHotkeys } from "@src/hooks/use-hotkeys";
import { HotkeyConstituentKey } from "@src/types/hotkeys";

export const SettingsButton = () => {
  const { settingsPanelOpen, setSettingsPanelOpen } =
    useContext(SettingsContext);
  const toggleSettingsPanel = () => setSettingsPanelOpen((p) => !p);

  useHotkeys({
    toggleSettingsPanel: {
      keyCombination: [
        HotkeyConstituentKey.SHIFT,
        HotkeyConstituentKey.ARROWUP,
      ],
      onMatch: toggleSettingsPanel,
    },
  });

  return (
    <IconButton
      id="settings-button"
      tooltip="View Settings"
      onClick={toggleSettingsPanel}
      icon={settingsPanelOpen ? CloseIcon : GearIcon}
      style={{
        ...(settingsPanelOpen && {
          color: "var(--color-red-400)",
          outline: "1px solid var(--color-red-400)",
        }),
      }}
    />
  );
};
