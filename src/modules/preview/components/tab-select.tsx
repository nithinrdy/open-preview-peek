import { useContext } from "react";
import { Tooltip } from "react-tooltip";

import { SettingsContext } from "@src/providers/settings";
import { SUPPORTED_PREVIEWS } from "@src/modules/preview/constants";
import type { PreviewKeys } from "../types";

export const TabSelect = ({
  selected,
  setSelected,
}: {
  selected: PreviewKeys;
  setSelected: (preview: PreviewKeys) => void;
}) => {
  const { settingsPanelOpen } = useContext(SettingsContext);

  return (
    <div className="p-0.5 rounded-[4px] flex gap-0.5 bg-background-2">
      {SUPPORTED_PREVIEWS.map((p) => {
        const Icon = p.icon;

        return (
          <>
            <button
              data-tooltip-id={`tooltip-${p.id}`}
              data-tooltip-content={p.name}
              key={p.id}
              className={
                "rounded-[4px] px-[8px] py-[6px] cursor-pointer hover:text-content-primary transition-colors " +
                (selected === p.id
                  ? "bg-background text-content-primary"
                  : "bg-background-2 text-content-secondary")
              }
              onClick={() => setSelected(p.id)}
              disabled={settingsPanelOpen} // so these tabs don't get tabbed-through while the settings panel is open
            >
              {Icon && <Icon className="w-[16px] h-[16px]" />}
            </button>
            <Tooltip id={`tooltip-${p.id}`} place="top" opacity={1} />
          </>
        );
      })}
    </div>
  );
};
