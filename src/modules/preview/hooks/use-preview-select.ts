import { useEffect, useState } from "react";

import {
  getFromChromeStorage,
  saveToChromeStorage,
} from "@src/utils/chrome-storage";
import { SUPPORTED_PREVIEWS } from "../constants";
import type { PreviewKeys } from "../types";

export const UsePreviewSelect = () => {
  const [selected, setSelected] = useState<PreviewKeys>(
    SUPPORTED_PREVIEWS[0].id,
  );

  useEffect(() => {
    (async () => {
      const storedSelection = (await getFromChromeStorage(
        "selected_preview",
      )) as PreviewKeys | null;
      if (
        storedSelection &&
        SUPPORTED_PREVIEWS.some((p) => p.id === storedSelection)
      ) {
        setSelected(storedSelection);
      }
    })();
  }, []);

  const saveSelection = (preview: PreviewKeys) => {
    setSelected(() => {
      saveToChromeStorage("selected_preview", preview);
      return preview;
    });
  };

  return { selectedPreview: selected, savePreviewSelection: saveSelection };
};
