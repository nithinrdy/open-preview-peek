import { useEffect, useState } from "react";

import type { PreviewData } from "@src/modules/preview/types";
import { getDataForPreview } from "../utils/get-data-for-preview";

export const useDataForPreview = () => {
  // string = an error message, undefined = still loading
  const [previewData, setPreviewData] = useState<
    PreviewData | string | undefined
  >(undefined);
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
