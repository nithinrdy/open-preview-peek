import { useState } from "react";

import { getDomainFromOgUrl } from "../../utils/get-domain-from-og-url";

type WhatsappPreviewProps = Partial<{
  "og:url": string;
  "og:title": string;
  "og:description": string;
  "og:image": string;
}>;

export const WhatsappPreview = ({
  "og:url": ogUrl,
  "og:title": title,
  "og:description": description,
  "og:image": imageUrl,
}: WhatsappPreviewProps) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const domain = getDomainFromOgUrl(ogUrl);

  return (
    <div className="max-w-[330px] flex flex-col rounded-lg bg-white">
      {imageUrl && !imageLoadError && (
        <img
          className="max-h-[240px] max-w-full rounded-t-lg"
          style={{ objectFit: "contain" }}
          src={imageUrl}
          onError={() => setImageLoadError(true)}
        />
      )}
      <div className="flex">
        <div
          className="min-w-0 px-2.5 py-1.5 flex flex-col gap-1 bg-whatsapp-background"
          style={{ ...(!imageLoadError && { flexGrow: 1, width: 0 }) }}
        >
          <p className="font-[600] text-whatsapp-primary text-whatsapp-sharp-text truncate">
            {title ?? domain}
          </p>
          <p className="text-whatsapp-sharp-text text-whatsapp-secondary line-clamp-2 text-ellipsis overflow-hidden">
            {description ?? ogUrl}
          </p>
          <p className="text-whatsapp-faded-text text-whatsapp-secondary truncate">
            {domain}
          </p>
        </div>
      </div>
    </div>
  );
};
