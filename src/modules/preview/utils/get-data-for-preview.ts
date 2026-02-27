import type { PreviewData } from "@src/modules/preview/types";
import { MessageType, type PreviewDataResponse } from "@src/types/message";

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

    return scriptResponse ? scriptResponse : "Failed to fetch preview data from the content script: see extension error logs or the extension's console for more details.";
  } catch (error) {
    console.error("Error getting preview data:", error);
    return error instanceof Error ? error.message : String(error);
  }
};
