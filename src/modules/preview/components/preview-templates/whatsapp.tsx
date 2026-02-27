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
  const domain = getDomainFromOgUrl(ogUrl);

  return (
    <div className="w-[330px] max-w-[330px] flex flex-col rounded-lg bg-whatsapp-background">
      {imageUrl && (
        <img
          className="max-h-[240px] max-w-full rounded-t-lg"
          style={{ objectFit: "contain" }}
          src={imageUrl}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      <div className="px-2.5 py-1.5 flex flex-col gap-1">
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
  );
};
