import { useState } from "react";

import { getDomainFromOgUrl } from "../../utils/get-domain-from-og-url";
import { PreviewError } from "./error";

type XPreviewProps = {
  url: string;
  "twitter:card"?: string;
  "twitter:title"?: string;
  "twitter:description"?: string;
  "twitter:image"?: string;
  "twitter:image:type"?: string;
  // OG values that x falls back onto
  "og:title"?: string;
  "og:description"?: string;
  "og:image"?: string;
};

export const XPreview = ({
  url,
  "twitter:card": twitterCard,
  "twitter:title": twitterTitle,
  "twitter:description": twitterDescription,
  "twitter:image": twitterImage,
  "og:title": ogTitle,
  "og:description": ogDescription,
  "og:image": ogImage,
}: XPreviewProps) => {
  const [cardType, setCardType] = useState<"summary" | "summary_large_image">(
    twitterCard === "summary_large_image" ? "summary_large_image" : "summary",
  );
  const title = twitterTitle ?? ogTitle ?? url;
  const description = twitterDescription ?? ogDescription;
  const imageUrl = twitterImage ?? ogImage;
  const domain = getDomainFromOgUrl(url);

  if (!twitterCard)
    return <PreviewError error="The 'twitter:card' meta tag is missing." />;

  return (
    <div className="flex flex-col gap-4">
      {cardType === "summary_large_image" ? (
        <div>
          <div className="relative w-[516px] max-w-[516px]">
            <img
              className="w-full rounded-2xl"
              src={imageUrl}
              onError={() => setCardType("summary")}
            />
            <span className="max-w-[90%] absolute left-2.5 bottom-2.5 bg-x-large-title-background text-x-large-title-text text-x-large-primary px-2 py-1 truncate">
              {title || url}
            </span>
          </div>
          <span className="text-x-large-primary text-x-large-from-text">
            From {domain}
          </span>
        </div>
      ) : (
        <div className="w-[568px] max-w-[568px] h-[124px] max-h-[124px] flex rounded-2xl border border-x-small-border">
          <img
            className="w-[124px] min-w-[124px] rounded-l-2xl border-r border-x-small-border object-contain object-center"
            src={imageUrl}
          />
          <div className="min-w-0 grow flex flex-col justify-center p-2.5">
            <span className="text-x-small-primary text-x-small-secondary-text truncate">
              {domain}
            </span>
            <span className="text-x-small-primary text-x-small-title-text truncate">
              {title || url}
            </span>
            <span className="text-x-small-primary text-x-small-secondary-text line-clamp-2 overflow-hidden text-ellipsis">
              {description}
            </span>
          </div>
        </div>
      )}
      <div className="font-rajdhani text-content-secondary text-[14px] max-w-[480px] self-center">
        1. X previews fall back onto the corresponding OG tag(s) when{" "}
        <code>twitter:title</code>, <code>twitter:description</code>, or{" "}
        <code>twitter:image</code> are missing.
        <br />
        {["app", "player"].includes(twitterCard ?? "") && (
          <>
            <br />
            2. Previews for pages with <code>twitter:card</code> set to{" "}
            <code>app</code> or <code>player</code> aren't supported. You'll
            still see a preview, but it's simply a preview of the{" "}
            <code>summary</code> card as a fallback. The layout is identical,
            but not the image, it's positioning, cropping, etc.
          </>
        )}
      </div>
    </div>
  );
};
