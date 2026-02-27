import type { PreviewData } from "@src/modules/preview/types";
import { MessageType, type PreviewDataResponse } from "@src/types/message";

export const getDataForPreview = async (): Promise<PreviewData | null> => {
  const currentTabId = (
    await chrome.tabs.query({ active: true, currentWindow: true })
  )[0].id;

  const scriptResponse = currentTabId
    ? ((await chrome.tabs.sendMessage(currentTabId, {
        type: MessageType.RequestPreviewData,
      })) as PreviewDataResponse)
    : undefined;

  return scriptResponse ? scriptResponse : null;
};
