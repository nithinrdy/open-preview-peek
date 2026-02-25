import { DarkModeIcon } from "@src/icons/dark-mode";
import { LightModeIcon } from "@src/icons/light-mode";

import { IconButton } from "@src/components/icon-button";

import { useThemeSwitch } from "@src/hooks/use-theme-switch";
import { useHotkeys } from "@src/hooks/use-hotkeys";
import { HotkeyConstituentKey } from "@src/types/hotkeys";

export const ThemeSwitchButton = () => {
  const { activeTheme, toggleTheme } = useThemeSwitch();

  useHotkeys({
    toggleTheme: {
      keyCombination: [
        HotkeyConstituentKey.SHIFT,
        HotkeyConstituentKey.ARROWDOWN,
      ],
      onMatch: () => toggleTheme(),
    },
  });

  return (
    <IconButton
      onClick={() => toggleTheme()}
      icon={activeTheme === "light" ? LightModeIcon : DarkModeIcon}
    />
  );
};
