import { MessageType, type PreviewDataResponse } from "@src/types/message";

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
  (message, sender, sendResponse: (response: PreviewDataResponse) => void) => {
    if (message.type === MessageType.RequestPreviewData) {
      const metaTags = document.querySelectorAll("meta");
      // const linkTags = document.querySelectorAll("link");
      // const titleTag = document.querySelector("title"); // Slack can fall back onto this...?

      const metaTagsOfInterest = Array.from(metaTags ?? [])
        .filter((meta) =>
          MetaPropertiesForOpenGraph.includes(
            meta.getAttribute("property") ?? "",
          ),
        )
        .map((meta) => ({
          property: meta.getAttribute("property") ?? undefined,
          content: meta.getAttribute("content") ?? undefined,
        }));

      // const faviconUrlFromLinkTags =
      //   Array.from(linkTags ?? [])
      //     .find((l) => l.getAttribute("rel") === "icon")
      //     ?.getAttribute("href") ??
      //   Array.from(linkTags ?? [])
      //     .find(
      //       (l) =>
      //         l.getAttribute("rel") === "shortcut icon" ||
      //         l.getAttribute("rel") === "alternate icon",
      //     )
      //     ?.getAttribute("href") ??
      //   undefined;

      sendResponse({
        metaTags: metaTagsOfInterest,
        faviconIcoUrl: `${window.location.origin}/favicon.ico`,
        origin: window.location.origin,
        url: window.location.href,
        // faviconUrlFromLinkTags: faviconUrlFromLinkTags?.startsWith("/")
        //   ? `${origin}${faviconUrlFromLinkTags}`
        //   : faviconUrlFromLinkTags,
      });

      // Works around potential CORS issues (or overkill?)
      // const getImageAsBase64 = async (
      //   url: string | undefined | null,
      // ): Promise<string | undefined> => {
      //   if (!url) return undefined;

      //   try {
      //     const response = await fetch(url);
      //     const blob = await response.blob();
      //     return await new Promise((resolve, reject) => {
      //       const reader = new FileReader();
      //       reader.onloadend = () => resolve(reader.result as string);
      //       reader.onerror = reject;
      //       reader.readAsDataURL(blob);
      //     });
      //   } catch (error) {
      //     console.error("Error fetching or converting image:", error);
      //     return undefined;
      //   }
      // };

      // const imageUrl = metaTagsOfInterest.find(
      //   (m) => m.property === "og:image",
      // )?.content;

      // getImageAsBase64(imageUrl)
      //   .then((base64) => {
      //     sendResponse({ metaTags: metaTagsOfInterest, ogImageBase64: base64 });
      //   })
      //   .catch((error) => {
      //     console.error(
      //       "Error while fetching image and converting it to base64, responding with meta tags only.",
      //       error,
      //     );
      //     sendResponse({ metaTags: metaTagsOfInterest });
      //   });
    }

    // return true;
    return undefined;
  },
);
