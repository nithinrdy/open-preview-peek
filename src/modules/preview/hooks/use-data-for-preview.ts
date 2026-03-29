import { useEffect, useState } from "react";

import type { PreviewData } from "@src/modules/preview/types";
import { MessageType } from "@src/types/message";

import { sanitizePreviewData } from "./../utils/sanitize-preview-data";

export const useDataForPreview = () => {
  // string = an error message, undefined = still loading
  const [previewData, setPreviewData] = useState<
    PreviewData | string | undefined
  >(undefined);

  const refreshPreviewData = () => {
    (async () => {
      const getDataForPreview = async (): Promise<PreviewData | string> => {
        try {
          const scriptResponse = await chrome.runtime.sendMessage({
            type: MessageType.BackgroundScriptRequest,
          });
          const sanitizedDataOrError = sanitizePreviewData(scriptResponse);

          return sanitizedDataOrError
            ? sanitizedDataOrError
            : "Failed to fetch preview data from the content script: see extension error logs or the extension's console for more details.";
        } catch (error) {
          console.error("Error getting preview data:", error);
          return error instanceof Error ? error.message : String(error);
        }
      };

      setPreviewData(await getDataForPreview());
    })();
  };
  useEffect(refreshPreviewData, []);

  return {
    previewData,
    // Wouldn't exactly need to refresh... ever, so just leaving this commented out.
    // refreshPreviewData
  };
};
