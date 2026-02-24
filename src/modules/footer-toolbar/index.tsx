import { ThemeSwitchButton } from "./components/theme-switch-button";
import { SettingsButton } from "./components/settings-button";

export const FooterToolbar = () => {
  return (
    <div className="mt-auto w-full py-1 px-1 border-t border-t-divider bg-background-2 flex items-center gap-1 z-[20] transition-colors duration-500">
      <SettingsButton />
      <span className="mx-auto font-rajdhani font-[700] text-content-primary text-xl select-none">Open Preview Peek</span>
      <ThemeSwitchButton />
    </div>
  );
};
