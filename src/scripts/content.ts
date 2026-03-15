import type { PreviewData } from "@src/modules/preview/types";
import { MessageType } from "@src/types/message";
import {
  MetaNamesForTwitter,
  MetaPropertiesForOpenGraph,
} from "@src/utils/constants";

chrome.runtime.sendMessage({
  type: MessageType.ContentData,
  data: ((): PreviewData => {
    const metaTags = document.querySelectorAll("meta");
    // const linkTags = document.querySelectorAll("link");
    // const titleTag = document.querySelector("title"); // Slack can fall back onto this...?

    const url = new URL(window.location.href);
    url.search = "";

    return {
      ...Array.from(metaTags).reduce<
        Omit<PreviewData, "faviconIcoUrl" | "url">
      >((acc, meta) => {
        const property = meta.getAttribute("property");
        const name = meta.getAttribute("name");

        if (
          property &&
          MetaPropertiesForOpenGraph.some((p) => p === property) // note to self: .some() instead of .includes() because https://stackoverflow.com/q/53033854
        ) {
          acc[property as (typeof MetaPropertiesForOpenGraph)[number]] =
            meta.getAttribute("content") ?? undefined;

          if (property === "og:image" && acc[property]?.startsWith("/")) {
            acc[property] = `${window.location.origin}${acc[property]}`;
          }
        }

        if (name && MetaNamesForTwitter.some((p) => p === name)) {
          acc[name as (typeof MetaNamesForTwitter)[number]] =
            meta.getAttribute("content") ?? undefined;

          if (name === "twitter:image" && acc[name]?.startsWith("/")) {
            acc[name] = `${window.location.origin}${acc[name]}`;
          }
        }

        return acc;
      }, {}),
      faviconIcoUrl: `${window.location.origin}/favicon.ico`,
      url: url.toString(),
    };
  })(),
});
