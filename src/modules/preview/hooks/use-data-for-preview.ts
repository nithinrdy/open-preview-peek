import { useEffect, useState } from "react";

import type { PreviewData } from "@src/modules/preview/types";
import { getDataForPreview } from "../utils/get-data-for-preview";

export const useDataForPreview = () => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const refresh = () => {
    (async () => setPreviewData(await getDataForPreview()))();
  };
  useEffect(refresh, []);

  return {
    previewData,
    // Wouldn't exactly need to refresh... ever, so just leaving this commented out.
    // refresh
  };
};
