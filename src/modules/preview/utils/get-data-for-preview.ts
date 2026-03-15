import type { PreviewData } from "@src/modules/preview/types";
import { MessageType } from "@src/types/message";

import { sanitizePreviewData } from "./sanitize-preview-data";

export const getDataForPreview = async (): Promise<PreviewData | string> => {
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
