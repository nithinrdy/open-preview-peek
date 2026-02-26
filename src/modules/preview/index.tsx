import { useHotkeys } from "@src/hooks/use-hotkeys";
import { HotkeyConstituentKey } from "@src/types/hotkeys";

import { useDataForPreview } from "./hooks/use-data-for-preview";
import { UsePreviewSelect } from "./hooks/use-preview-select";
import { TabSelect } from "./components/tab-select";
import {
  SlackPreview,
  DiscordPreview,
  WhatsappPreview,
  LinkedInPreview,
} from "./components/preview-templates";
import { SUPPORTED_PREVIEWS } from "./constants";
import { useContext } from "react";
import { SettingsContext } from "@src/providers/settings";

const PREVIEW_COMPONENTS = {
  x: () => <></>,
  slack: SlackPreview,
  whatsapp: WhatsappPreview,
  linkedin: LinkedInPreview,
  discord: DiscordPreview,
};

export const Preview = () => {
  const { selectedPreview, savePreviewSelection } = UsePreviewSelect();
  const { previewData } = useDataForPreview();
  const SelectedPreviewComponent = PREVIEW_COMPONENTS[selectedPreview];
  const { settingsPanelOpen } = useContext(SettingsContext);

  useHotkeys({
    nextPreview: {
      keyCombination: [
        HotkeyConstituentKey.SHIFT,
        HotkeyConstituentKey.ARROWRIGHT,
      ],
      onMatch: () => {
        if (settingsPanelOpen) return;

        const currentIndex = SUPPORTED_PREVIEWS.findIndex(
          (p) => p.id === selectedPreview,
        );
        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % SUPPORTED_PREVIEWS.length;
          savePreviewSelection(SUPPORTED_PREVIEWS[nextIndex].id);
        }
      },
    },
    previousPreview: {
      keyCombination: [
        HotkeyConstituentKey.SHIFT,
        HotkeyConstituentKey.ARROWLEFT,
      ],
      onMatch: () => {
        if (settingsPanelOpen) return;

        const currentIndex = SUPPORTED_PREVIEWS.findIndex(
          (p) => p.id === selectedPreview,
        );
        if (currentIndex !== -1) {
          const previousIndex =
            (currentIndex - 1 + SUPPORTED_PREVIEWS.length) %
            SUPPORTED_PREVIEWS.length;
          savePreviewSelection(SUPPORTED_PREVIEWS[previousIndex].id);
        }
      },
    },
  });

  return (
    <div className="p-[16px] flex flex-col justify-center items-center gap-[16px]">
      <TabSelect
        selected={selectedPreview}
        setSelected={savePreviewSelection}
      />
      {/* TODO: Validate previewData before previewing */}
      <SelectedPreviewComponent {...previewData} />
    </div>
  );
};
