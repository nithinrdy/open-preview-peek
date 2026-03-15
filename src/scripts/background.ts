import { type PreviewData } from "@src/modules/preview/types";
import { MessageType } from "@src/types/message";

const CONTENT_MESSAGE_LISTENER_TIMEOUT = 3000;

// Listen for requests from popup, keep open while the content script does its thing,
// respond back to popup with whatever the content script sends
chrome.runtime.onMessage.addListener(
  (
    message,
    sender,
    sendResponse: (
      response?: PreviewData | string, // string for error
    ) => void,
  ) => {
    if (message.type !== MessageType.BackgroundScriptRequest) return undefined;

    (async () => {
      try {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!activeTab?.id) {
          sendResponse("No active tab found.");
          return;
        }

        // set up a listener for the content script's response, then inject it
        // receive message from the content script, carry it back to the popup
        const previewDataPromise = new Promise<PreviewData>((res, rej) => {
          const timeout = setTimeout(() => {
            // remove listener and reject if no data received from content script within timeout
            chrome.runtime.onMessage.removeListener(handleContentMessage);
            rej("Timed out waiting for preview data from content script.");
          }, CONTENT_MESSAGE_LISTENER_TIMEOUT);

          const handleContentMessage = (
            contentMessage: {
              type: MessageType.ContentData;
              data: PreviewData;
            },
            sender: chrome.runtime.MessageSender,
          ) => {
            if (!sender.tab?.id || sender.tab.id !== activeTab.id)
              return undefined;

            if (
              contentMessage.type !== MessageType.ContentData ||
              !contentMessage.data
            ) {
              return undefined;
            }

            clearTimeout(timeout);
            chrome.runtime.onMessage.removeListener(handleContentMessage);
            res(contentMessage.data);

            return undefined;
          };

          chrome.runtime.onMessage.addListener(handleContentMessage);
        });

        await chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ["scripts/content.js"],
        });

        sendResponse(await previewDataPromise);
      } catch (error) {
        console.error("Error retrieving preview data:", error);
        sendResponse(error instanceof Error ? error.message : String(error));
      }
    })();

    return true;
  },
);
