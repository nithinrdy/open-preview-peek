import { useContext } from "react";

import { GearIcon } from "@src/icons/gear";
import { CloseIcon } from "@src/icons/close";

import { IconButton } from "@src/components/icon-button";
import { SettingsContext } from "@src/providers/settings";

export const SettingsButton = () => {
  const { settingsPanelOpen, setSettingsPanelOpen } =
    useContext(SettingsContext);

  return (
    <IconButton
      onClick={() => setSettingsPanelOpen((p) => !p)}
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
