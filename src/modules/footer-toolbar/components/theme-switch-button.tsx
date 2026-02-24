import { DarkModeIcon } from "@src/icons/dark-mode";
import { LightModeIcon } from "@src/icons/light-mode";

import { IconButton } from "@src/components/icon-button";

import { useThemeSwitch } from "@src/hooks/use-theme-switch";

export const ThemeSwitchButton = () => {
  const { activeTheme, toggleTheme } = useThemeSwitch();

  return (
    <IconButton
      onClick={() => toggleTheme()}
      icon={activeTheme === "light" ? LightModeIcon : DarkModeIcon}
    />
  );
};
