import DOMPurify from "dompurify";

import type { PreviewData } from "@src/modules/preview/types";
import { MessageType, type PreviewDataResponse } from "@src/types/message";
import { INSECURE_URL_BLOCKED_MESSAGE } from "../constants";

const sanitizePreviewData = (previewData: PreviewData | undefined) => {
  // Only allow https URLs (unless the origin is localhost, which is cool as well)
  const omitIfNeitherHttpsNorLocalhost = (
    str: string | undefined,
  ): string | undefined => {
    if (!str) return str;

    try {
      const url = new URL(str);
      if (
        url.protocol === "https:" ||
        ["localhost", "127.0.0.1"].includes(url.hostname)
      ) {
        return str;
      }

      return INSECURE_URL_BLOCKED_MESSAGE;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return str; // Ignore if not a URL (sanitization alone should suffice)
    }
  };

  return previewData
    ? (Object.fromEntries(
        Object.entries(previewData).map(([k, v]) => [
          k,
          omitIfNeitherHttpsNorLocalhost(DOMPurify.sanitize(v)),
        ]),
      ) as PreviewData)
    : undefined;
};

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
