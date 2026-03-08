import DOMPurify from "dompurify";

import type { PreviewData } from "@src/modules/preview/types";
import { MessageType, type PreviewDataResponse } from "@src/types/message";

const sanitizePreviewData = (previewData: PreviewData | undefined) =>
  previewData
    ? (Object.fromEntries(
        Object.entries(previewData).map(([k, v]) => [k, DOMPurify.sanitize(v)]),
      ) as PreviewData)
    : undefined;

export const getDataForPreview = async (): Promise<PreviewData | string> => {
  try {
    const currentTabId = (
      await chrome.tabs.query({ active: true, currentWindow: true })
    )[0].id;

    const scriptResponse = currentTabId
      ? ((await chrome.tabs.sendMessage(currentTabId, {
          type: MessageType.RequestPreviewData,
        })) as PreviewDataResponse)
      : undefined;
    const sanitizedPreviewData = sanitizePreviewData(scriptResponse);

    return sanitizedPreviewData
      ? sanitizedPreviewData
      : "Failed to fetch preview data from the content script: see extension error logs or the extension's console for more details.";
  } catch (error) {
    console.error("Error getting preview data:", error);
    return error instanceof Error ? error.message : String(error);
  }
};
