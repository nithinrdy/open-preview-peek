import { MessageType } from "./../types/message";

const MetaPropertiesForOpenGraph = [
  "og:title",
  "og:description",
  "og:image",
  "og:url",
  "og:image:type",
  "og:image:width",
  "og:image:height",
];

// Not yet
// const MetaNamesForTwitter = [
//   "twitter:title",
//   "twitter:description",
//   "twitter:image",
//   "twitter:image:type",
//   "twitter:image:width",
//   "twitter:image:height",
// ];

chrome.runtime.onMessage.addListener(
  (
    message,
    sender,
    sendResponse: (response: {
      metaTags: {
        name: string | null;
        property: string | null;
        content: string | null;
      }[];
    }) => void
  ) => {
    if (message.type === MessageType.RequestMetaTags) {
      const metaTags = document.querySelectorAll("meta");

      const metaTagsOfInterest = Array.from(metaTags ?? [])
        .filter((meta) =>
          MetaPropertiesForOpenGraph.includes(
            meta.getAttribute("property") ?? ""
          )
        )
        .map((meta) => ({
          name: meta.getAttribute("name"),
          property: meta.getAttribute("property"),
          content: meta.getAttribute("content"),
        }));

      sendResponse({ metaTags: metaTagsOfInterest });
    }

    return undefined;
  }
);
