import { MessageType, type PreviewDataResponse } from "@src/types/message";
import {
  MetaNamesForTwitter,
  MetaPropertiesForOpenGraph,
} from "@src/utils/constants";

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse: (response: PreviewDataResponse) => void) => {
    if (message.type === MessageType.RequestPreviewData) {
      const metaTags = document.querySelectorAll("meta");
      // const linkTags = document.querySelectorAll("link");
      // const titleTag = document.querySelector("title"); // Slack can fall back onto this...?

      sendResponse({
        ...Array.from(metaTags).reduce<
          Omit<PreviewDataResponse, "faviconIcoUrl">
        >((acc, meta) => {
          const property = meta.getAttribute("property");
          const name = meta.getAttribute("name");

          if (
            property &&
            MetaPropertiesForOpenGraph.some((p) => p === property) // .some() instead of .includes() because https://stackoverflow.com/q/53033854
          ) {
            acc[property as (typeof MetaPropertiesForOpenGraph)[number]] =
              meta.getAttribute("content") ?? undefined;
          }

          if (name && MetaNamesForTwitter.some((p) => p === name)) {
            acc[name as (typeof MetaNamesForTwitter)[number]] =
              meta.getAttribute("content") ?? undefined;
          }

          return acc;
        }, {}),
        faviconIcoUrl: `${window.location.origin}/favicon.ico`,
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
