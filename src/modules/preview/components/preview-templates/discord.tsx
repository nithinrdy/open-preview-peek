export type DiscordPreviewProps = Partial<{
  siteName: string;
  title: string;
  description: string;
  imageUrl: string;
}>;

export const DiscordPreview = ({
  siteName,
  title,
  description,
  imageUrl,
}: DiscordPreviewProps) => {
  return (
    <div className="w-[432px] max-w-[432px] border border-discord-subtle-border rounded-sm flex bg-discord-background">
      <div className="min-h-full min-w-1 bg-discord-left-edge" />
      <div className="grow px-[14px] pt-2 pb-4 flex flex-col gap-1">
        <span className="flex gap-2 items-center text-content-primary text-discord-site-name">
          <span className="max-w-[360px] truncate">{siteName}</span>
        </span>
        <p className="max-w-[360px] font-[600] text-discord-title-text text-discord-title truncate">
          {title}
        </p>
        <p className="text-discord-description text-content-primary line-clamp-5 text-ellipsis overflow-hidden">
          {description}
        </p>
        <img
          className="max-h-[260px] max-w-[396px] rounded-sm mt-1"
          style={{ objectFit: "contain", objectPosition: "left" }}
          src={imageUrl}
        />
      </div>
    </div>
  );
};
