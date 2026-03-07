import { PreviewError } from "./error";

type DiscordPreviewProps = Partial<{
  "og:site_name": string;
  "og:title": string;
  "og:description": string;
  "og:image": string;
}>;

export const DiscordPreview = ({
  "og:site_name": siteName,
  "og:title": title,
  "og:description": description,
  "og:image": imageUrl,
}: DiscordPreviewProps) => {
  if (!title) return <PreviewError error="The og:title tag is missing." />;

  return (
    <div className="w-[432px] max-w-[432px] border border-discord-subtle-border rounded-sm flex bg-discord-background">
      <div className="min-h-full min-w-1 bg-discord-left-edge" />
      <div className="min-w-0 grow px-[14px] pt-2 pb-4 flex flex-col gap-1">
        <span className="flex gap-2 items-center text-content-primary text-discord-tertiary">
          <span className="max-w-[360px] truncate">{siteName}</span>
        </span>
        <p className="max-w-[360px] font-[600] text-discord-title-text text-discord-primary truncate">
          {title}
        </p>
        <p className="text-discord-secondary text-content-primary line-clamp-5 text-ellipsis overflow-hidden">
          {description}
        </p>
        {imageUrl && (
          <img
            className="max-h-[260px] max-w-[396px] rounded-sm mt-1"
            style={{ objectFit: "contain", objectPosition: "left" }}
            src={imageUrl}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
    </div>
  );
};
