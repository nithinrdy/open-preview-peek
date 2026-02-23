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
  if (!scriptResponse) return null;

  const { metaTags, faviconIcoUrl } = scriptResponse;
  const ogUrl = metaTags.find((t) => t.property === "og:url")?.content;
  const domain = (
    ogUrl?.startsWith("https://")
      ? ogUrl.split("https://")[1]
      : ogUrl?.startsWith("http://")
        ? ogUrl.split("http://")[1]
        : ogUrl
  )?.split("/")[0];

  return {
    domain,
    faviconIcoUrl,
    title: metaTags.find((t) => t.property === "og:title")?.content,
    description: metaTags.find((t) => t.property === "og:description")?.content,
    imageUrl: metaTags.find((t) => t.property === "og:image")?.content,
    siteName: metaTags.find((t) => t.property === "og:site_name")?.content,
  };
};
