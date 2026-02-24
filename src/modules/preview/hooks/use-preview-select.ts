import { useContext, useEffect, useState } from "react";

import {
  getFromChromeStorage,
  saveToChromeStorage,
} from "@src/utils/chrome-storage";
import {
  StorageKeys,
  type ChromeStorageLastSelectedPreviewValue,
} from "@src/types/chrome-storage";
import { SettingsContext } from "@src/providers/settings";
import { SUPPORTED_PREVIEWS } from "../constants";
import type { PreviewKeys } from "../types";

export const UsePreviewSelect = () => {
  const [selected, setSelected] = useState<PreviewKeys>(
    SUPPORTED_PREVIEWS[0].id,
  );
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    (async () => {
      const storedSelection =
        await getFromChromeStorage<ChromeStorageLastSelectedPreviewValue>(
          StorageKeys.LAST_SELECTED_PREVIEW,
        );
      if (
        // Name makes it sound like this check should happen when setting, but from a user POV this is more intuitive ig.
        settings.rememberLastSelectedPreview &&
        storedSelection &&
        SUPPORTED_PREVIEWS.some((p) => p.id === storedSelection)
      ) {
        setSelected(storedSelection);
      }
    })();
  }, [settings.rememberLastSelectedPreview]);

  const saveSelection = (preview: PreviewKeys) => {
    setSelected(() => {
      saveToChromeStorage(StorageKeys.LAST_SELECTED_PREVIEW, preview);
      return preview;
    });
  };

  return { selectedPreview: selected, savePreviewSelection: saveSelection };
};
