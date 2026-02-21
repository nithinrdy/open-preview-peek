import { GearIcon } from "@src/icons/gear";
import { IconButton } from "@src/components/icon-button";

import { ThemeSwitchButton } from "./theme-switch-button";

export const FooterToolbar = () => {
  return (
    <div className="mt-auto w-full py-1 px-1 border-t border-t-divider bg-background-2 flex items-center gap-1">
      <IconButton icon={GearIcon} />
      <ThemeSwitchButton />
    </div>
  );
};
