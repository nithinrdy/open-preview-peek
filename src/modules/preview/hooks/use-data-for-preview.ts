import { useEffect, useState } from "react";

import type { PreviewTemplateProps } from "@src/modules/preview/types";
import { getDataForPreview } from "@src/utils/get-data-for-preview";

export const useDataForPreview = () => {
  const [previewData, setPreviewData] = useState<PreviewTemplateProps | null>(
    null,
  );

  const refresh = () => {
    (async () => setPreviewData(await getDataForPreview()))();
  };
  useEffect(refresh, []);

  return { previewData, refresh };
};
