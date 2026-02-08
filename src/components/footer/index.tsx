import { GearIcon } from "@src/icons/gear";
import { IconButton } from "@src/components/shared/icon-button";

import { ThemeSwitchButton } from "./theme-switch-button";

export const Footer = () => {
  return (
    <div className="mt-auto w-full h-10 border-t border-t-divider bg-background-2 flex items-center px-1 gap-1">
      <IconButton icon={GearIcon} />
      <ThemeSwitchButton />
    </div>
  );
};
