import { MessageType } from "./../types/message";

const MetaPropertiesForOpenGraph = [
  "og:title",
  "og:type",
  "og:description",
  "og:url",
  "og:site_name",
  "og:image",
  "og:image:type",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
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
      ogImageBase64?: string | undefined;
    }) => void,
  ) => {
    if (message.type === MessageType.RequestMetaTags) {
      const metaTags = document.querySelectorAll("meta");

      const metaTagsOfInterest = Array.from(metaTags ?? [])
        .filter((meta) =>
          MetaPropertiesForOpenGraph.includes(
            meta.getAttribute("property") ?? "",
          ),
        )
        .map((meta) => ({
          name: meta.getAttribute("name"),
          property: meta.getAttribute("property"),
          content: meta.getAttribute("content"),
        }));

      // Works around potential CORS issues
      const getImageAsBase64 = async (
        url: string | undefined | null,
      ): Promise<string | undefined> => {
        if (!url) return undefined;

        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error("Error fetching or converting image:", error);
          return undefined;
        }
      };

      const imageUrl = metaTagsOfInterest.find(
        (m) => m.property === "og:image",
      )?.content;

      getImageAsBase64(imageUrl)
        .then((base64) => {
          sendResponse({ metaTags: metaTagsOfInterest, ogImageBase64: base64 });
        })
        .catch((error) => {
          console.error(
            "Error while fetching image and converting it to base64, responding with meta tags only.",
            error,
          );
          sendResponse({ metaTags: metaTagsOfInterest });
        });
    }

    return true;
  },
);
